import { DndContext, DragOverlay } from "@dnd-kit/core";
import { SortableContext, arrayMove, horizontalListSortingStrategy } from "@dnd-kit/sortable";
import { useDndSensors } from "../../../utils";
import { useContext, useState } from "react";
import { NodeContext } from "../../../contexts";
import { Group } from "@mantine/core";
import { NodeComponent, NodeComponentRenderer } from "../Node";

export const SortableContainer = ({ elements, items }) => {
    let { value, setValue } = useContext(NodeContext);
    let [activeIndex, setActiveIndex] = useState(null);
    let sensors = useDndSensors();

    return (
        <DndContext sensors={sensors} onDragEnd={onDragEnd} onDragStart={onDragStart}>
            <SortableContext
                strategy={horizontalListSortingStrategy}
                items={items}>
                <Group wrap="nowrap">
                    {elements.map((el, i) => (<div key={i}>{el}</div>))}
                </Group>
            </SortableContext>
            <DragOverlay dropAnimation={{
                duration: 500,
            }}>
                {activeIndex !== null && (
                    <NodeContext.Provider value={{ value: value.data[activeIndex] }}>
                        <NodeComponentRenderer />
                    </NodeContext.Provider>
                )}
            </DragOverlay>
        </DndContext>
    );

    function onDragStart(e) {
        setActiveIndex(Number(e.active.id.split("::")[1]));
    }

    function onDragEnd(e) {
        const { active, over } = e;

        if (over && active.id !== over.id) {
            let from = Number(active.id.split("::")[1]);
            let to = Number(over.id.split("::")[1]);

            let data = arrayMove(
                value.data,
                from,
                to,
            );

            setValue({
                ...value,
                data,
            })
        }

        setActiveIndex(null);
    }
};
