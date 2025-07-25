import { BoxedExpression, ComputeEngine } from "@cortex-js/compute-engine";
import { RelationNode } from "../node";
const ce = new ComputeEngine();

function Add(node: RelationNode, x: BoxedExpression): { node: RelationNode, equiv: true } {
    node.data.LHS.add(x);
    node.data.RHS.add(x);
    return { node: node, equiv: true };
}
function Multiply(node: RelationNode, x: BoxedExpression): { node: RelationNode, equiv: boolean } {
    node.data.LHS.add(x);
    node.data.RHS.add(x);
    return { node: node, equiv: x.type.matches(ce.type("!0")) };
}
// Applying functions will hhave to wait until i figure out how functions work in ce
