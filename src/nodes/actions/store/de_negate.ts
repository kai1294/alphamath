import { Nodes } from "../..";
import { MathNode, NegatedNode } from "../../../types";
import { match } from "../../../utils";
import { isContainer } from "../../meta";
import { Action } from "../types";

const apply = (node: MathNode) => {
    return (node.data as NegatedNode).data;
}

const filter = (node: MathNode) => {
    return node.type == "Negated" && node.data.type == "Negated";
};

export default {
    name: "De-Negate",
    id: "de_negate",
    filter,
    apply,
} as Action;
