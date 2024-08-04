import { Box, Group, Paper, Stack, Text } from "@mantine/core";
import React, { PropsWithChildren } from "react";
import { DragHandle } from "../workspace/DragHandle";
import { Size } from "../../types/scalar";
import { LongActionIcon } from "../menu/ui/LongActionIcon";
import { IconX } from "@tabler/icons-react";

export const PanelWindow = ({
    children,
    title,
    size,
    onResize,
    resizable,
    onFocus,
    onClose,
}: {
    title?: React.ReactNode;
    size?: Size;
    resizable?: boolean,
    onResize?: (size: Size) => void;
    onFocus?: () => void;
    onClose?: () => void;
} & PropsWithChildren) => {
    return (
        <Paper
            bg="dark.6"
            style={{
                cursor: "auto",
                textWrap: "nowrap",
                boxShadow: "0px 0px 0.5em 0.5em rgba(0,0,0,0.2)",
            }}
            onMouseDown={(e) => {
                onFocus?.();
                e.stopPropagation();
            }}
            w={size?.w}
            h={size?.h}
        >
            <Stack gap={0} w="100%" h="100%">
                <DragHandle w="100%" onMouseDown={onFocus}>
                    <Box h="2em" w="100%" bg="dark.5">
                        <Group px="xs" align="center" h="100%" w="100%" justify="space-between">
                            <Group>
                                {title}
                            </Group>
                            <Group>
                                {onClose && (
                                    <LongActionIcon
                                        onLongPress={onClose}
                                        variant="light"
                                        color="gray"
                                        duration={2000}
                                        ringColor="yellow"
                                    >
                                        <IconX />
                                    </LongActionIcon>
                                )}
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
