import { DndContext, DragOverlay, closestCorners } from "@dnd-kit/core";
import { SortableContext, arrayMove, horizontalListSortingStrategy } from "@dnd-kit/sortable";
import { useDndSensors } from "../../../../utils";
import { useContext, useState } from "react";
import { NodeContext, OptionsContext } from "../../../contexts";
import { Group } from "@mantine/core";
import { NodeComponent, NodeComponentRenderer } from "../Node";

export const SortableContainer = ({ elements, items }) => {
    const [{ paintContainersDark }] = useContext(OptionsContext);
    let { value, setValue } = useContext(NodeContext);
    let [activeIndex, setActiveIndex] = useState(null);
    let sensors = useDndSensors();

    const findChild = (uuid) => {
        return value.data.indexOf(value.data.find(n => n.uuid == uuid));
    }

    return (
        <DndContext
            sensors={sensors}
            onDragEnd={onDragEnd}
            onDragStart={onDragStart}
            collisionDetection={closestCorners}>
            <SortableContext
                id={`${value.uuid}::container`}
                strategy={horizontalListSortingStrategy}
                items={items}>
                <Group wrap="nowrap" bg={activeIndex === null ? undefined : (paintContainersDark ? "dark" : undefined)}>
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
        setActiveIndex(findChild(e.active.id));
    }

    function onDragEnd(e) {
        const { active, over } = e;

        if (over && active.id !== over.id) {
            let from = findChild(active.id);
            let to = findChild(over.id);

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
