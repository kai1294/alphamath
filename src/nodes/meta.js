import { match } from "../utils"

export const shouldParenthesis = (container, child) => {
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
