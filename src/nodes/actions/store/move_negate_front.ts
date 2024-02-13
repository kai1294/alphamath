import { Nodes } from "../..";
import { match } from "../../../utils";
import { isContainer } from "../../meta";

const apply = (node) => {
    let negatedNodes = node.data.filter(n => n.type == "Negated");
    let nonNegatedNodes = node.data.filter(n => n.type != "Negated");

    let nodes = [
        ...nonNegatedNodes,
        ...negatedNodes.map(n => n.data),
    ];

    let n = Nodes.Multiplication(nodes);
    for(let _neg of negatedNodes) {
        n = Nodes.Negated(n);
    }

    return n;
}

const filter = (node) => {
    return node.type == "Multiplication" && node.data.some(n => n.type == "Negated");
};

export default {
    name: "Move negate to front",
    id: "move_negate_front",
    filter,
    apply,
};
