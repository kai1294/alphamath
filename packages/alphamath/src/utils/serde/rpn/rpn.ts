import { MathNode } from "@/types/model/node";

type RPNOperator = "+" | "-" | "*" | "/";

export const parseRPN = (input: string): MathNode => {
    let stack: MathNode[] = [];

    const combine = (op: RPNOperator) => {
        let a = stack.pop();
        let b = stack.pop();
        if(!a || !b) throw new Error("Not enough items in stack to do an operation");

        if(op == "+") stack.push(MathNode.Addition([b, a]));
        if(op == "*") stack.push(MathNode.Multiplication([b, a]));
        if(op == "/") stack.push(MathNode.Division([b, a]));
        if(op == "-") stack.push(MathNode.Addition([b, MathNode.Negated(a)]));
    };

    for(let token of input.split(" ").filter(x => !!x)) {
        if(isNaN(Number(token))) {
            if(token == "+" || token == "*" || token == "/" || token == "-") {
                combine(token);
            } else if (token.match(/^[a-z]+$/i)) {
                stack.push(MathNode.Variable(token));
            } else {
                throw new Error("Unknown token: " + token);
            }
        } else {
            stack.push(MathNode.Number(Number(token)));
        }
    }

    if(stack.length !== 1)
        throw new Error("Stack has leftover items");

    return stack[0];
};
