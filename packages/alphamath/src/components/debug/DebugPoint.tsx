import { TransformProvider } from "@alan404/react-workspace";
import { Vec2 } from "@alan404/vec2";
import { Box, Tooltip } from "@mantine/core";

export const DebugPoint = ({
    pos,
    size = 20,
    label,
}: {
    pos?: Vec2,
    size?: number,
    label?: string,
}) => {
    return (
        <TransformProvider position={{
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
