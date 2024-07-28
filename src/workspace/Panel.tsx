import { Box, Group, Paper, Stack, Text } from "@mantine/core";
import React, { PropsWithChildren, useContext, useState } from "react";
import { useHandle } from "../hooks/useHandle";
import { useRelativeDrag } from "../hooks/useRelativeDrag";
import { Transform, TransformProvider } from "./Transform";
import { GlobalTransform } from "./GlobalTransform";

export interface GenericPanelProps {
    title?: React.ReactNode;
    autoSize?: boolean;
}

export const Panel = ({
    children,
    ...props
}: GenericPanelProps & PropsWithChildren) => {
    return (
        <TransformProvider>
            <PanelContent {...props}>
                {children}
            </PanelContent>
        </TransformProvider>
    )
}

export const PanelContent = ({
    children,
    title,
    autoSize,
}: GenericPanelProps & PropsWithChildren) => {
    const { scale } = useContext(GlobalTransform);
    const { position } = useContext(Transform);
    const [{ w, h }, setSize] = useState({ w: 200, h: 200 });

    const { props: sizerProps } = useRelativeDrag({
        value: { x: w, y: h },
        onChange: ({ x, y }) => setSize({ w: x, h: y }),
        scale,
    });

    const { props } = useHandle();

    return (
        <Paper
            bg="dark.6"
            w={autoSize ? "auto" : w}
            h={autoSize ? "auto" : h}
            style={{ cursor: "auto", textWrap: "nowrap" }}
            shadow="xl"
            radius="md"
            onMouseDown={(e) => e.stopPropagation()}
        >
            <Stack>
                <Box {...props} h="2em" bg="dark.5">
                    <Group px="xs" align="center" h="100%" justify="space-between">
                        <Group>
                            {title || (
                                <Text>
                                    window ({position.x}, {position.y})
                                </Text>
                            )}
                        </Group>
                        <Group>

                        </Group>
                    </Group>
                </Box>
                <Box w="100%" h="100%">
                    {children}
                </Box>
            </Stack>

            {!autoSize && (
                <Box
                    w="1em"
                    h="1em"
                    style={{
                        position: "absolute",
                        bottom: "-0.2em",
                        right: "-0.2em",
                        cursor: "se-resize"
                    }}
                    {...sizerProps}
                />
            )}
        </Paper>
    )
};
