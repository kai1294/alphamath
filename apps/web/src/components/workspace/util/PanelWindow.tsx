import { Box, Group, Paper, Stack, Text } from "@mantine/core";
import React, { PropsWithChildren } from "react";
import { DragHandle } from "@alan404/react-workspace";
import { Size } from "../../../types/scalar";
import { LongActionIcon } from "../../menu/ui/LongActionIcon";
import { IconTrash, IconX } from "@tabler/icons-react";
import { shadow } from "../../../utils/styling";

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
                ...shadow(),
            }}
            onMouseDown={(e) => {
                onFocus?.();
                e.stopPropagation();
            }}
            w={size?.w}
            h={size?.h}
            radius="sm"
        >
            <Stack gap={0} w="100%" h="100%">
                <DragHandle onMouseDown={onFocus}>
                    <Box
                        h="2em"
                        w="100%"
                        bg="dark.5"
                        style={{
                            borderTopLeftRadius: "var(--mantine-radius-sm)",
                            borderTopRightRadius: "var(--mantine-radius-sm)",
                        }}
                    >
                        <Group px="sm" align="center" h="100%" w="100%" justify="space-between">
                            <Group>
                                {title}
                            </Group>
                            <Group>
                                {onClose && (
                                    <LongActionIcon
                                        onLongPress={onClose}
                                        variant="light"
                                        color="gray"
                                        duration={1000}
                                    >
                                        <IconTrash />
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
