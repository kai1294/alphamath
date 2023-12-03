import { isContainer } from "../meta";

const apply = (node) => {
    if (isContainer(node)) {
        if (node.data.length == 1) {
            return node.data[0];
        };

        if (node.type == "Addition") {
            return {
                ...node,
                data: node.data.flatMap(n => apply(n.type == "Addition" ? n.data : n)),
            };
        }
    }

    return node;
};

export default {
    name: "Flatten",
    id: "flatten",
    filter: (n) => isContainer(n),
    apply,
};
