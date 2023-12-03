interface ContainerNode {
    data: MathNode[],
}

type NumberNode = {
    type: "Number"
    data: Number
}

type VariableNode = {
    type: "Variable"
    data: Number
}

type AdditionNode = {
    type: "Addition"
    data: MathNode[]
}

type MultiplicationNode = {
    type: "Multiplication"
    data: MathNode[]
}

type NegatedNode = {
    type: "Negated"
    data: MathNode
}

type DivisionNode = {
    type: "Division"
    data: [MathNode, MathNode]
}

type ExponentiationNode = {
    type: "Exponentiation"
    data: [MathNode, MathNode]
}

type RootNode = {
    type: "Root"
    data: [MathNode, MathNode]
}

type MathNode = NumberNode
    | VariableNode
    | AdditionNode
    | NegatedNode
    | MultiplicationNode
    | DivisionNode
    | ExponentiationNode
    | RootNode;

type NodeContext = {
    value: MathNode,
    setValue: (newValue: MathNode) => void,
    executeAction: () => void,
}
