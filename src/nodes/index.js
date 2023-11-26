import { match } from "../utils";
import actions from "./actions";

const createNode = (type, data) => ({ type, data })
const Nodes = Object.fromEntries([
    // Number
    "Number",
    // String
    "Variable",
    // Array<Node>
    "Addition",
    // Node
    "Negated",
    // Array<Node>
    "Multiplication",
    // [Node, Node]
    "Division",
    // [Node, Node]
    "Exponentiation",
    // [Node, Node]
    "Root",
].map(n => [n, (d) => createNode(n, d)]));

export {
    Nodes,
    actions,
};

((
    Nodes.Addition([
        Nodes.Multiplication([
            Nodes.Negated(Nodes.Number(5)),
            Nodes.Variable("x")
        ]),
        Nodes.Number(1),
        Nodes.Negated(Nodes.Number(2))
    ])
))
