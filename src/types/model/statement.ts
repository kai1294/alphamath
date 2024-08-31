import { createFactory, Enum } from "@alan404/enum";
import { MathNode } from "./node";

export const MathStatement = createFactory<MathStatement>();
export type MathStatement = Enum<{
    Expression: MathNode;
    Equals: { left: MathNode; right: MathNode; };
    NotEquals: { left: MathNode; right: MathNode; };
}>;
