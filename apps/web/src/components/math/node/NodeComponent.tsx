import { Box, Group, Paper, Text } from "@mantine/core";
import { MathNode } from "../../../types/model/node";
import { WithSetters } from "../../../types/utils";
import { AdditionNode } from "./types/AdditionNode";
import { ComponentType, PropsWithChildren, useContext, useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { match } from "@alan404/enum";
import { MultiplicationNode } from "./types/MultiplicationNode";
import { ErrorCard } from "@/components/debug/ErrorCard";
import { NodeComponentWrapper, WithWrappers, WrappersContext } from "./Wrappers";
import { Selectable } from "../select/Selectable";
import { SelectableWrapper } from "./wrappers/SelectableWrapper";
import { TransformProvider } from "@alan404/react-workspace";
import { vec2 } from "@alan404/vec2";

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
            position={transform || vec2()}
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

export type NodeComponentProps = WithSetters<{ node: MathNode }> & {
    wrappers?: NodeComponentWrapper[];
};

export const NodeComponent = ({
    node,
    setNode,
    wrappers = [],
}: NodeComponentProps) => {
    const prevWrappers = useContext(WrappersContext);

    return (
        <WrappersContext.Provider value={[
            ...prevWrappers,
            ...wrappers,
            SelectableWrapper,
        ]}>
            <WithWrappers
                node={node}
                setNode={setNode}
            >
                <Paper withBorder shadow="md" px="sm" py="xs" radius="md">
                    {match(node)({
                        Number: (n) => <Text>{n.toString()}</Text>,
                        Variable: (v) => <Text>{v}</Text>,
                        Addition: (v) => (
                            <AdditionNode
                                data={v}
                                onChange={(n) => setNode({
                                    ...MathNode.Addition(n),
                                    id: node.id,
                                })}
                            />
                        ),
                        Multiplication: (v) => (
                            <MultiplicationNode
                                data={v}
                                onChange={(n) => setNode({
                                    ...MathNode.Multiplication(n),
                                    id: node.id,
                                })}
                            />
                        ),
                        _: () => (
                            <ErrorCard
                                message="TODO"
                                description={node.type}
                            />
                        ),
                    }) as React.ReactNode}
                </Paper>
            </WithWrappers>
        </WrappersContext.Provider>
    )
};
