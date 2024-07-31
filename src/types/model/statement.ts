import { Enum } from "../utils";
import { MathNode } from "./node";

export type MathStatement = Enum<{
    Expression: MathNode;
    Equals: { left: MathNode; right: MathNode; };
    NotEquals: { left: MathNode; right: MathNode; };
}>;
