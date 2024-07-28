import { Box } from "@mantine/core";
import { PropsWithChildren, useContext, useRef, useState } from "react";
import { GlobalTransform } from "./GlobalTransform";
import { useRelativeDrag } from "../hooks/useRelativeDrag";
import { BackgroundGrid } from "../components/detail/BackgroundGrid";
import { Position } from "./types";
import { useMousePosition } from "../hooks/useMousePosition";
import { DebugPoint } from "../components/debug/DebugPoint";

export const WorkspaceView = ({
    children
}: PropsWithChildren) => {
    const mouse = useMousePosition();
    const { position, setPosition, scale, setScale } = useContext(GlobalTransform);
    const [lastTouchDistance, setLastTouchDistance] = useState<number | null>(null);
    const workspaceRef = useRef(null);

    const { isDragging: isPanning, props } = useRelativeDrag({
        value: position,
        onChange: setPosition,
        scale: 1,
    });

    const clientPosition = ({ clientX, clientY }: { clientX: number; clientY: number }) => ({
        x: clientX,
        y: clientY,
    });

    const getDistance = (touch1: React.Touch, touch2: React.Touch) => {
        const dx = touch2.clientX - touch1.clientX;
        const dy = touch2.clientY - touch1.clientY;
        return Math.sqrt(dx * dx + dy * dy);
    };

    const getMiddle = (a: Position, b: Position) => {

    };

    const handleScaleChange = (scaleChange: number, point: Position) => {
        let newScale = Math.max(0.3, Math.min(2, scale + scaleChange));
        if (newScale == scale) return;
        setScale(newScale);
        setPosition({
            x: Math.round(position.x - (point.x * scaleChange)),
            y: Math.round(position.y - (point.y * scaleChange)),
        })
    };

    const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
        e.preventDefault();
        const delta = e.deltaY;
        const scaleChange = (e.deltaY < 0 ? 1 : -1) * 0.1;
        handleScaleChange(scaleChange, {
            x: ((window.innerWidth / 2) - position.x) / scale,
            y: ((window.innerHeight / 2) - position.y) / scale,
        });
    };

    const handleTouchMove = (event: React.TouchEvent<HTMLElement>) => {
        if (event.touches.length === 2) {
            const distance = getDistance(event.touches[0], event.touches[1]);
            if (lastTouchDistance !== null) {
                const scaleChange = distance / lastTouchDistance;
                setScale(scale * scaleChange);
            }
            setLastTouchDistance(distance);
        }
    };

    const handleTouchEnd = () => {
        setLastTouchDistance(null);
    };

    return (
        <Box
            onWheel={handleWheel}
            onTouchMove={handleTouchMove}
            {...props}
            onTouchEnd={(e) => {
                props.onTouchEnd(e);
                handleTouchEnd();
            }}
            w="100vw"
            h="100vh"
            style={{
                overflow: "hidden",
                position: 'relative',
                cursor: isPanning ? "grabbing" : "grab",
            }}
        >
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

                <DebugPoint pos={{
                    x: ((window.innerWidth / 2) - position.x) / scale,
                    y: ((window.innerHeight / 2) - position.y) / scale,
                }} />
            </Box>
        </Box>
    )
}
