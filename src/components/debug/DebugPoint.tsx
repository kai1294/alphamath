import { Box } from "@mantine/core";
import { TransformProvider } from "../../workspace/Transform";
import { Position } from "../../workspace/types";

export const DebugPoint = ({ pos }: { pos: Position }) => {
    const size = 20;
    
    return (
        <TransformProvider value={{
            x: pos.x - size/2,
            y: pos.y - size/2,
        }}>
            <Box
                w={size+"px"}
                h={size+"px"}
                bg="green"
                style={{ borderRadius: `${size/2}px` }}
            />
        </TransformProvider>
    )
};
