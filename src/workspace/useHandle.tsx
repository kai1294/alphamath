import { useContext, useState } from "react";
import { GlobalTransform } from "./GlobalTransform";
import { Transform } from "./Transform";
import { useHotkeys, useWindowEvent } from "@mantine/hooks";
import { Position } from "./types";

export const useRelativeDrag = <T,>({
    value,
    onChange,
    scale,
}: {
    value: Position,
    onChange: (pos: Position) => void,
    scale: number,
}) => {
    const [isDragging, setIsDragging] = useState(false);
    const [startDragPosition, setStartDragPosition] = useState<Position>({ x: 0, y: 0 });
    const [start, setStart] = useState<Position>({ x: 0, y: 0 });

    useHotkeys([["Escape", () => setIsDragging(false)]]);

    useWindowEvent("mousemove", (e) => {
        if (!isDragging) return;
        onInputMove({ x: e.clientX, y: e.clientY });
    });

    useWindowEvent("touchmove", (e) => {
        if (!isDragging) return;
        if (e.touches.length != 1) return;
        e.preventDefault();
        let touch = e.touches[0];
        onInputMove({ x: touch.clientX, y: touch.clientY });
    });

    const onInputMove = (delta: Position) => {
        const dx = delta.x - start.x;
        const dy = delta.y - start.y;
        onChange({
            x: Math.round(startDragPosition.x + (dx / scale)),
            y: Math.round(startDragPosition.y + (dy / scale)),
        });
    };

    return {
        isDragging,
        props: {
            onMouseDown: (e: React.MouseEvent<HTMLElement>) => {
                e.stopPropagation();
                e.preventDefault();
                (document.activeElement as HTMLElement)?.blur();
                setIsDragging(true);
                setStart({ x: e.clientX, y: e.clientY });
                setStartDragPosition(value);
            },

            onMouseUp: () => {
                setIsDragging(false);
            },

            onTouchStart: (e: React.TouchEvent<HTMLElement>) => {
                if (e.touches.length != 1) return;
                e.stopPropagation();
                setIsDragging(true);
                setStartDragPosition(value);
                let touch = e.touches[0];
                setStart({ x: touch.clientX, y: touch.clientY });
            },

            onTouchEnd: (e: React.TouchEvent<HTMLElement>) => {
                setIsDragging(false);
            },
        },
    };
};

export const useHandle = () => {
    const { scale } = useContext(GlobalTransform);
    const { position, setPosition } = useContext(Transform);

    const { props, isDragging } = useRelativeDrag({
        value: position,
        onChange: setPosition,
        scale,
    });

    return {
        props: {
            ...props,
            style: {
                cursor: isDragging ? "grabbing" : "grab",
            }
        },
        isDragging,
    };
}

