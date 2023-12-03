import { useContext } from "react";
import { NodeContext, OptionsContext } from "../../contexts";
import { DndContext, useDroppable } from "@dnd-kit/core";
import { Plus } from "../../glyphs";
import { NodeComponent } from "./Node";
import { Group } from "@mantine/core";
import { SortableContext, arrayMove, horizontalListSortingStrategy } from "@dnd-kit/sortable";
import { useDndSensors } from "../../utils";
import { notifications } from "@mantine/notifications";
import { useId } from "@mantine/hooks";
import { SortableContainer } from "./common/SortableContainer";

const AdditionNode = () => {
    let [{ hidePlusIfNegated }] = useContext(OptionsContext);
    let { value, setValue } = useContext(NodeContext);
    let id = useId();

    // Node stuff
    let elements = [];

    let prev;
    for (let idx = 0; idx < value.data.length; idx++) {
        let node = value.data[idx];

        if (prev && (hidePlusIfNegated ? node.type != "Negated" : true)) {
            elements.push(<Plus />);
        }

        //elements.push(<Gap visible={isOver} />);

        elements.push(<NodeComponent
            dndId={`${id}::${idx}`}
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
            items={value.data.map((_, i) => `${id}:${i}`)}
            />
    );
};

export default AdditionNode;
