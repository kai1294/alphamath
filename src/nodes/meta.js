import { match } from "../utils"

export const isContainer = (node) => {
    return match(node.type)({
        Addition: true,
        Multiplication: true,
        _: false,
    });
};

export const isWrapper = (node) => {
    return match(node.type)({
        Negated: true,
        _: false,
    });
};

export const shouldParenthesis = (container, child) => {
    if (container.type == child.type) return true;

    return match(container.type)([
        Addition => match(child.type)([
            Variable => false,
            Number => false,
            Multiplication => false,
            Negated => false,
            _ => true,
        ]),
        Negated => match(child.type)([
            Variable => false,
            Number => false,
            _ => true,
        ]),
        Multiplication => match(child.type)([
            Number => false,
            Variable => false,
            Negated => false,
            _ => true,
        ]),
        Exponentiation => match(child.type)([
            Number => false,
            Variable => false,
            _ => true,
        ]),
        _ => false,
    ])
}
