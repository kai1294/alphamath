import { useContext, useState } from "react";
import { GlobalTransform } from "./GlobalTransform";
import { Transform } from "./Transform";
import { useHotkeys, useWindowEvent } from "@mantine/hooks";

export const useRelativeDrag = <T,>({
    value,
    onChange,
}: {
    value: { x: number, y: number },
    onChange: ({ x, y }: { x: number, y: number }) => void,
}) => {
    const { scale } = useContext(GlobalTransform);

    const [isDragging, setIsDragging] = useState(false);
    const [startDragPosition, setStartDragPosition] = useState({ x: 0, y: 0 });
    const [mouseStart, setMouseStart] = useState({ x: 0, y: 0 });

    useHotkeys([["Escape", () => setIsDragging(false)]]);

    useWindowEvent("mousemove", (e) => {
        if (!isDragging) return;
        const dx = e.clientX - mouseStart.x;
        const dy = e.clientY - mouseStart.y;
        onChange({
            x: Math.round(startDragPosition.x + (dx / scale)),
            y: Math.round(startDragPosition.y + (dy / scale)),
        });
    });

    const handleMouseDown = (e: React.MouseEvent<T>) => {
        e.stopPropagation();
        e.preventDefault();
        setIsDragging(true);
        setMouseStart({ x: e.clientX, y: e.clientY });
        setStartDragPosition(value);
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    return {
        props: {
            onMouseDown: handleMouseDown,
            onMouseUp: handleMouseUp,
        },
        isDragging,
    };
};

export const useHandle = <T,>() => {
    const { setX, setY, x, y } = useContext(Transform);

    const { props, isDragging } = useRelativeDrag({
        value: { x, y },
        onChange: ({ x, y }) => {
            setX(x);
            setY(y);
        },
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

