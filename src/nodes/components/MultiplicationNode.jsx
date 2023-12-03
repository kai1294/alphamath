import { DndContext, useDroppable } from "@dnd-kit/core";
import { Group } from "@mantine/core";
import { useId } from "@mantine/hooks";
import { useContext } from "react";
import { NodeComponent } from './Node';
import { NodeContext } from "../../contexts";
import { Dot } from "../../glyphs";

const MultiplicationNode = () => {
    let { value, setValue } = useContext(NodeContext);
    // Dnd kit stuff
    let id = useId();
    const { isOver, setNodeRef } = useDroppable({
        id,
        data: {
            value,
        },
    });

    // Node stuff
    let elements = [];

    let prev;
    for (let idx = 0; idx < value.data.length; idx++) {
        let node = value.data[idx];

        if (prev) {
            elements.push(<Dot />);
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
            items={value.data.map((_, i) => `${id}::${i}`)}
            />
    );
};

export default MultiplicationNode;
