import { Nodes } from "..";
import { match } from "../../utils";
import { isContainer } from "../meta";

const apply = (node) => {
    return node.data.data;
}

const filter = (node) => {
    return node.type == "Negated" && node.data.type == "Negated";
};

export default {
    name: "De-Negate",
    id: "de_negate",
    filter,
    apply,
};
