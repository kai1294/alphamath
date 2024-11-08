import { AdditionNode, DivisionNode, MathNode, MultiplicationNode, NegatedNode } from "../../../types";
import { match } from "../../../utils";

export const fromString = (s: string): MathNode => {
    
}

export const toString = (node: MathNode): string => {
    return match(node.type)({
        Number: () => node.data.toString(),
        Variable: () => node.data,
        Addition: () => `(${(node as AdditionNode).data.map(toString).join("+")})`,
        Negated: () => `(-${toString((node as NegatedNode).data)})`,
        Division: () => `(${(node as DivisionNode).data.map(toString).join("/")})`,
        Multiplication: () => `(${(node as MultiplicationNode).data.map(toString).join(".")})`,
    });
}
