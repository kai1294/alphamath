import { useContext, useState } from "react";
import { GlobalTransform } from "./GlobalTransform";
import { Transform } from "./Transform";
import { useWindowEvent } from "@mantine/hooks";

export const useHandle = <T,>() => {
    const { scale } = useContext(GlobalTransform);
    const { setX, setY, x, y } = useContext(Transform);

    const [isDragging, setIsDragging] = useState(false);
    const [startDragPosition, setStartDragPosition] = useState({ x: 0, y: 0 });
    const [mouseStart, setMouseStart] = useState({ x: 0, y: 0 });

    useWindowEvent("mousemove", (e) => {
        if (!isDragging) return;
        const dx = e.clientX - mouseStart.x;
        const dy = e.clientY - mouseStart.y;
        setX(Math.round(startDragPosition.x + (dx / scale)));
        setY(Math.round(startDragPosition.y + (dy / scale)));
    });

    const handleMouseDown = (e: React.MouseEvent<T>) => {
        e.stopPropagation();
        e.preventDefault();
        setIsDragging(true);
        setMouseStart({ x: e.clientX, y: e.clientY });
        setStartDragPosition({ x, y });
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
}

