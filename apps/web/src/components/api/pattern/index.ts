import { MathNode } from "../../../types/model/node";
import { Enum } from "@alan404/enum";

export type Pattern<E extends Enum<any>> = {
    
};




let test = MathNode.Multiplication([
    MathNode.Number(4),
    MathNode.Addition([
        MathNode.Variable("a"),
        MathNode.Variable("b"),
    ])
])





