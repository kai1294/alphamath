import { match } from "../../utils";

const apply = (node) => {
    return match(node.type)({
        Addition: () => ({
            data: node.data.flatMap(n => n.type == "Addition" ? n.data : n),
            ...node,
        }),
        _: () => node,
    });
};

export default {
    name: "Flatten",
    id: "flatten",
    desc: "Remove extra parenthesis",
    apply,
};
