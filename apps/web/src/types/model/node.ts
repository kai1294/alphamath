import { WithId } from "../scalar";
import { createFactory, Enum, match } from "@alan404/enum";

export const MathNode = createFactory<MathNode>(WithId);
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

// utilities

export const childMathNodes = (node: MathNode): MathNode[] => {
    return match<MathNode, MathNode[]>(node)({
        Number: () => [],
        NumberRepeating: () => [],
        Variable: () => [],
        
        Negated: (v) => [v],
        Absolute: (v) => [v],

        Addition: (v) => v,
        Division: (v) => v,
        Exponentiation: (v) => v,
        Function: ({ identifier, args }) => [identifier, ...args],
        Multiplication: (v) => v,
        Root: (v) => v,
    });
};

export const isMathNodeInside = (parent: MathNode, { id }: WithId): boolean => {
    if(parent.id == id) return true;
    
    return childMathNodes(parent).some(child => isMathNodeInside(child, { id }));
};
