import { Nodes } from "../..";
import { match } from "../../../../utils";
import { isContainer } from "../../meta";

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

            if (!list.length) {
                list.push(Nodes.Number(0));
            }

            return list.length == 1 ? list[0] : Nodes.Addition(list);
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

            return list.length == 1 ? list[0] : Nodes.Multiplication(list);
        },
        Division: () => {
            let [a, b] = node.data.map(apply);

            if (a.type == "Number" && b.type == "Number" && Number.isInteger(a.data/b.data)) {
                return Nodes.Number(a.data/b.data);
            }

            return {
                ...node,
                data: [a, b],
            };
        },
        _: () => node,
    });
}

const containsLiteral = (node) => {
    if (isContainer(node)) {
        return node.data.filter(n => n.type == "Number" || containsLiteral(n)).length > 1;
    }

    return match(node.type)({
        Number: true,
        Variable: false,
        Negated: () => containsLiteral(node.data),
        Division: () => node.data.some(containsLiteral) || Number.isInteger(node.data[0]/node.data[1]),
    })
};

export default {
    name: "Evaluate Literals",
    id: "eval_lits",
    desc: "Calculate all the literal math operations such as 1+1",
    filter: containsLiteral,
    apply,
};
