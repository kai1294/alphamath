import { Box } from "@mantine/core";
import { PropsWithChildren, useContext, useRef, useState } from "react";
import { GlobalTransform } from "./GlobalTransform";
import { useRelativeDrag } from "./useHandle";

export const WorkspaceView = ({
    children
}: PropsWithChildren) => {
    const { position, setPosition, scale, setScale } = useContext(GlobalTransform);
    const workspaceRef = useRef(null);

    const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
        e.preventDefault();
        const delta = e.deltaY;
        const newScale = scale - delta / 500;
        const clamped = Math.max(0.1, Math.min(2, newScale));
        setScale(clamped);
    };

    const { isDragging: isPanning, props } = useRelativeDrag({
        value: position,
        onChange: setPosition,
        scale: 1,
    });

    return (
        <Box
            onWheel={handleWheel}
            {...props}
            w="100vw"
            h="100vh"
            style={{
                overflow: "hidden",
                position: 'relative',
                cursor: isPanning ? "grabbing" : "grab",
            }}>
            <Box
                ref={workspaceRef}
                style={{
                    transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                    transformOrigin: '0 0',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                }}
            >
                {children}
            </Box>
        </Box>
    )
}
