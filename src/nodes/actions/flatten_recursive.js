import { Nodes } from "..";
import { match } from "../../utils";
import { isContainer } from "../meta";
import flatten from "./flatten";

const apply = (node) => {
    let n = flatten.apply(node);
    if (isContainer(n)) {
        let data = n.data.map(apply);
        return flatten.apply({
            ...n,
            data,
        });
    } else {
        return n;
    }
}

const filter = (node) => {
    return isContainer(node);
};

export default {
    name: "Flatten (recursive)",
    id: "flatten_recursive",
    filter,
    apply,
};
