import { Box, Group, Paper, Stack, Text } from "@mantine/core";
import React, { PropsWithChildren } from "react";
import { DragHandle } from "../workspace/DragHandle";
import { Size } from "../../types/scalar";

export const PanelWindow = ({
    children,
    title,
    size,
    onResize,
    resizable,
}: {
    title?: React.ReactNode;
    size?: Size;
    resizable?: boolean,
    onResize?: (size: Size) => void;
} & PropsWithChildren) => {
    return (
        <Paper
            bg="dark.6"
            style={{ cursor: "auto", textWrap: "nowrap" }}
            shadow="xl"
            onMouseDown={(e) => e.stopPropagation()}
            w={size?.w}
            h={size?.h}
        >
            <Stack gap={0} w="100%" h="100%">
                <DragHandle w="100%">
                    <Box h="2em" w="100%" bg="dark.5">
                        <Group px="xs" align="center" h="100%" w="100%" justify="space-between">
                            <Group>
                                {title}
                            </Group>
                            <Group>

                            </Group>
                        </Group>
                    </Box>
                </DragHandle>
                <Box w="100%" h="100%">
                    {children}
                </Box>
            </Stack>

            {resizable && (
                <DragHandle
                    w="1em"
                    h="1em"
                    style={{
                        position: "absolute",
                        bottom: "-0.2em",
                        right: "-0.2em",
                        cursor: "se-resize"
                    }}
                    position={{
                        x: size?.w as number,
                        y: size?.h as number,
                    }}
                    setPosition={({ x, y }) => onResize?.({ w: x, h: y })}
                />
            )}
        </Paper>
    )
};
