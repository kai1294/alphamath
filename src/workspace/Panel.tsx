import { Box, Stack } from "@mantine/core";
import { PropsWithChildren, useState } from "react";
import { useHandle } from "./useHandle";
import { TransformProvider } from "./Transform";

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
    const [{ w, h }, setSize] = useState({ w: 200, h: 200 });
    const { props } = useHandle();

    return (
        <Box bg="dark.6" w={w} h={h}>
            <Stack>
                <Box {...props} bg="dark.5">
                    window
                </Box>
                <Box w="100%" h="100%">
                    {children}
                </Box>
            </Stack>
        </Box>
    )
};
