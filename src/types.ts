export interface ContainerNode {
    data: MathNode[],
}

export type NumberNode = {
    type: "Number"
    data: Number
}

export type VariableNode = {
    type: "Variable"
    data: Number
}

export type AdditionNode = {
    type: "Addition"
    data: MathNode[]
}

export type MultiplicationNode = {
    type: "Multiplication"
    data: MathNode[]
}

export type NegatedNode = {
    type: "Negated"
    data: MathNode
}

export type DivisionNode = {
    type: "Division"
    data: [MathNode, MathNode]
}

export type ExponentiationNode = {
    type: "Exponentiation"
    data: [MathNode, MathNode]
}

export type RootNode = {
    type: "Root"
    data: [MathNode, MathNode]
}

export type MathNode =
    NumberNode
    | VariableNode
    | AdditionNode
    | NegatedNode
    | MultiplicationNode
    | DivisionNode
    | ExponentiationNode
    | RootNode;

export type NodeContext = {
    value: MathNode,
    setValue: (newValue: MathNode) => void,
    executeAction: () => void,
}
