import { Nodes } from "..";
import { match } from "../../utils";

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
        _: () => node,
    });
}

export default {
    name: "Evaluate Literals",
    id: "eval_lits",
    desc: "Calculate all the literal math operations such as 1+1",
    apply,
};
