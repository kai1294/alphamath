import { Box, Group, Paper, Text } from "@mantine/core";
import { MathNode } from "../../../types/model/node";
import { WithSetters } from "../../../types/utils";
import { AdditionNode } from "./types/AdditionNode";
import { TransformProvider } from "@/components/workspace/Transform";
import { DragHandle } from "@/components/workspace/DragHandle";
import { useState } from "react";
import { DefaultPosition, Position } from "@/types/scalar";
import { useSortable } from "@dnd-kit/sortable";
import { match } from "@alan404/enum";

export const SortableNodeComponent = ({
    node,
    setNode,
}: WithSetters<{ node: MathNode }>) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transition,
        transform,
    } = useSortable({
        id: node.id,
    });

    return (
        <TransformProvider
            value={transform || DefaultPosition}
            style={{
                transition,
                position: "unset",
            }}
            ref={setNodeRef}
            {...attributes}
            {...listeners}
        >
            <NodeComponent
                {...{ node, setNode }}
            />
        </TransformProvider>
    )
}

export const NodeComponent = ({
    node,
    setNode,
}: WithSetters<{ node: MathNode }>) => {
    const [position, setPosition] = useState<Position>(DefaultPosition);

    return (
        <Paper withBorder shadow="md" px="sm" py="xs" radius="md">
            {match(node)({
                Number: (n) => <Text>{n.toString()}</Text>,
                Variable: (v) => <Text>{v}</Text>,
                Addition: (v) => (
                    <AdditionNode
                        data={v}
                        onChange={(n) => setNode({
                            ...node,
                            type: "Addition",
                            data: n,
                        })}
                    />
                ),
                _: () => <Text>todo</Text>,
            }) as React.ReactNode}
        </Paper>
    )
};
