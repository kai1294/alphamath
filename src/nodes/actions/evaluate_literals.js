import { Nodes } from "..";
import { match } from "../../utils";
import { isContainer } from "../meta";

const apply = (node) => {
    return match(node.type)({
        Addition: () => {
            let list = [];
            let acc = 0;

            for (let n of node.data.map(apply)) {
                match(n.type)({
                    Number: () => acc += (n.data),
                    Negated: () => {
                        if (n.data.type == "Number") {
                            acc -= (n.data.data)
                        } else {
                            list.push(n)
                        }
                    },
                    _: () => list.push(n),
                })
            }

            if (acc) {
                if (0 < acc) {
                    list.push(Nodes.Number(acc));
                } else {
                    list.push(Nodes.Negated(Nodes.Number(-acc)));
                }
            }

            return Nodes.Addition(list);
        },
        Multiplication: () => {
            let list = [];
            let acc = 1;

            for (let n of node.data.map(apply)) {
                match(n.type)({
                    Number: () => acc *= (n.data),
                    Negated: () => {
                        if (n.data.type == "Number") {
                            acc *= -(n.data.data)
                        } else {
                            list.push(n)
                        }
                    },
                    _: () => list.push(n),
                })
            }

            if (acc) {
                if (0 < acc) {
                    list.push(Nodes.Number(acc));
                } else {
                    list.push(Nodes.Negated(Nodes.Number(-acc)));
                }
            }

            return Nodes.Multiplication(list);
        },
        _: () => node,
    });
}

const containsLiteral = (node) => {
    if (isContainer(node)) {
        return node.data.filter(n => n.type == "Number" || containsLiteral(n)).length > 1;
    }

    match(node.type)({
        Number: true,
        Variable: false,
        Negated: () => containsLiteral(node.data),
    })
};

export default {
    name: "Evaluate Literals",
    id: "eval_lits",
    desc: "Calculate all the literal math operations such as 1+1",
    filter: containsLiteral,
    apply,
};
