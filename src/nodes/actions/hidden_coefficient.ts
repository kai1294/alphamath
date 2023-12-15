import { Nodes } from "..";
import { match } from "../../utils";
import { isContainer } from "../meta";

const apply = (node) => {
    return Nodes.Multiplication([
        Nodes.Number(1),
        node,
    ]);
}

const filter = (node) => {
    return true;
};

export default {
    name: "Show hidden coefficient of 1",
    id: "show_hidden_coefficient",
    filter,
    apply,
};
