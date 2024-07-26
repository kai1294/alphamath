import { match } from "../../../utils";

export const toLatex = (node) => {
    return match(node.type)({
        Number: () => node.data,
        Variable: () => node.data,
        Addition: () => node.data.map(toLatex).join("+"),
        Multiplication: () => node.data.map(toLatex).join(""),
    });
};

export const fromLatex = (latex) => {
    
};

