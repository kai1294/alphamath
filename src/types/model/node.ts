import { WithId } from "../scalar";
import { Enum } from "../utils";

export type MathNode = Enum<{
    /// Represents Zero or any Positive number
    Number: number;
    NumberRepeating: { number: number; digits: number; }; // ?
    Variable: string;
    Negated: MathNode;
    Absolute: MathNode;
    Addition: MathNode[];
    Multiplication: MathNode[];
    Exponentiation: [MathNode, MathNode];
    Division: [MathNode, MathNode];
    Root: [MathNode, MathNode];
    Function: { identifier: MathNode; args: MathNode[] };
}> & WithId;
