import { Nodes } from "..";
import { match } from "../../utils";
import { isContainer } from "../meta";

const apply = (node) => {
    
}

const filter = (node) => {
    return true;
};

export default {
    name: "Group shared multiplicants",
    id: "group_mul",
    filter,
    apply,
};
