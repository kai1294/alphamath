import { Box, Group, Stack, Text } from "@mantine/core";
import { PropsWithChildren, useContext, useState } from "react";
import { useHandle, useRelativeDrag } from "./useHandle";
import { Transform, TransformProvider } from "./Transform";

export const Panel = ({ children }: PropsWithChildren) => {
    return (
        <TransformProvider>
            <PanelContent>
                {children}
            </PanelContent>
        </TransformProvider>
    )
}

export const PanelContent = ({
    children,
}: PropsWithChildren) => {
    const { x, y } = useContext(Transform);
    const [{ w, h }, setSize] = useState({ w: 200, h: 200 });

    const { props: sizerProps } = useRelativeDrag({
        value: { x: w, y: h },
        onChange: ({ x, y }) => setSize({ w: x, h: y }),
    });

    const { props } = useHandle();

    return (
        <Box
            bg="dark.6"
            w={w}
            h={h}
            style={{ cursor: "auto" }}
            onMouseDown={(e) => e.stopPropagation()}
        >
            <Stack>
                <Box {...props} h="2em" bg="dark.5">
                    <Group px="xs" align="center" h="100%" justify="space-between">
                        <Text>window ({x}, {y})</Text>
                        <Group>

                        </Group>
                    </Group>
                </Box>
                <Box w="100%" h="100%">
                    {children}
                </Box>
            </Stack>

            <Box
                w="1em"
                h="1em"
                bg="blue"
                style={{
                    position: "absolute",
                    bottom: "-0.2em",
                    right: "-0.2em",
                }}
                {...sizerProps}
            >

            </Box>
        </Box>
    )
};
