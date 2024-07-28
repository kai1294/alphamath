import { Enum } from "../utils";

export type MathNode = Enum<{
    Number: number;
    Variable: string;
    Negated: MathNode;
    Addition: MathNode[];
    Multiplication: MathNode[];
    Exponentiation: [MathNode, MathNode];
    Division: [MathNode, MathNode];
    Root: [MathNode, MathNode];
}>;
