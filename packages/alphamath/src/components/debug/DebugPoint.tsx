import { Box, Tooltip } from "@mantine/core";
import { TransformProvider } from "../../workspace/Transform";
import { Position } from "../../types/scalar";

export const DebugPoint = ({
    pos,
    size = 20,
    label,
}: {
    pos?: Position,
    size?: number,
    label?: string,
}) => {
    return (
        <TransformProvider value={{
            x: (pos?.x || 0) - size/2,
            y: (pos?.y || 0) - size/2,
        }}>
            <Tooltip label={label} disabled={!label}>
                <Box
                    w={size+"px"}
                    h={size+"px"}
                    bg="green"
                    style={{ borderRadius: `${size/2}px` }}
                />
            </Tooltip>
        </TransformProvider>
    )
};
