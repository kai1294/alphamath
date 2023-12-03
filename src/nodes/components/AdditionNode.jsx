import { useContext } from "react";
import { NodeContext, OptionsContext } from "../../contexts";
import { Plus } from "../../glyphs";
import { NodeComponent } from "./Node";
import { SortableContainer } from "./common/SortableContainer";

const AdditionNode = () => {
    let [{ hidePlusIfNegated }] = useContext(OptionsContext);
    let { value, setValue } = useContext(NodeContext);

    let elements = [];

    let prev;
    for (let idx = 0; idx < value.data.length; idx++) {
        let node = value.data[idx];

        if (prev && (hidePlusIfNegated ? node.type != "Negated" : true)) {
            elements.push(<Plus />);
        }

        elements.push(<NodeComponent
            value={node}
            onChange={(v) => setValue({
                type: value.type,
                data: value.data.map((t, i) => i == idx ? v : t)
            })} />);

        prev = node;
    }

    return (
        <SortableContainer
            elements={elements}
            items={value.data.map((n) => n.uuid)}
            />
    );
};

export default AdditionNode;
