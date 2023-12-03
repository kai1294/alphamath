import { Nodes } from "..";
import { match } from "../../utils";
import { isContainer } from "../meta";

// 5*(1+2) => 5*1+5*2

const apply = (node) => {
    let unit = node.data.find(n => ["Number", "Variable"].includes(n.type));
    let container = node.data.find(n => isContainer(n));

    return Nodes[container.type](container.data.map(n => (
        Nodes[node.type]([
            unit,
            n,
        ])
    )))
}

const filter = (node) => {
    return (node.type == "Multiplication")
        && node.data.length == 2
        && node.data.filter(n => ["Number", "Variable"].includes(n.type)).length == 1
        && node.data.filter(n => ["Multiplication", "Addition"].includes(n.type)).length == 1;
};

export default {
    name: "Distribute Multiplication",
    id: "distribute",
    filter,
    apply,
};
