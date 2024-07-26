import { isContainer } from "../../meta";

const apply = (node) => {
    if (isContainer(node)) {
        if (node.data.length == 1) {
            return node.data[0];
        };

        let data = node.data.flatMap(n => apply(n.type == node.type ? n.data : n));

        return data.length == 1 ? data[0] : {
            ...node,
            data,
        };
    }

    return node;
};

export default {
    name: "Flatten",
    id: "flatten",
    filter: (n) => isContainer(n),
    apply,
};
