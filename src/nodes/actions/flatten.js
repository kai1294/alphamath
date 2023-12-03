import { match } from "../../utils";
import { isContainer } from "../meta";

const apply = (node) => {
    if (isContainer(node) && node.data.length == 1) {
        return node.data[0];
    }

    return match(node.type)({
        Addition: () => ({
            data: node.data.flatMap(n => apply(n.type == "Addition" ? n.data : n)),
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
