import { Nodes } from "..";
import { match } from "../../utils";
import { isContainer } from "../meta";

const apply = (node) => {
    let data = node.data.filter(n => n.node != "Number" && n.data != 1);

    // for 1*1*1 etc.
    if(!data.length) data = node.data[0];
    
    return data.length == 1 ? data[0] : {
        ...node,
        data,
    };
}

const filter = (node) => {
    return node.type == "Multiplication" && node.data.some(n => n.type == "Number" && n.data == 1);
};

export default {
    name: "Remove coefficient of 1",
    id: "remove_coefficient",
    filter,
    apply,
};
