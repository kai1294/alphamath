import { Group, Paper, Text } from "@mantine/core";
import { MathNode } from "../../../types/model/node";
import { match, WithSetters } from "../../../types/utils";
import { AdditionNode } from "./types/AdditionNode";
import { TransformProvider } from "@/components/workspace/Transform";
import { DragHandle } from "@/components/workspace/DragHandle";
import { useState } from "react";
import { DefaultPosition, Position } from "@/types/scalar";

export const NodeComponent = ({
    node,
    setNode,
}: WithSetters<{ node: MathNode }>) => {
    const [position, setPosition] = useState<Position>(DefaultPosition);

    return (
        <TransformProvider
            value={position}
            onChange={setPosition}
            style={{
                position: "unset",
                transition: position == DefaultPosition ? "transform 0.2s" : "",
            }}
        >
            <DragHandle onDragEnd={() => setPosition(DefaultPosition)}>
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
            </DragHandle>
        </TransformProvider>
    )
};
