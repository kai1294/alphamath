import { Box, BoxComponentProps, BoxProps, PolymorphicComponentProps } from "@mantine/core";
import { PropsWithChildren, useContext, useEffect } from "react";
import { Transform } from "../core/Transform";
import { useRelativeDrag } from "../../../hooks/useRelativeDrag";
import { Position } from "../../../types/scalar";

export const DragHandle = ({
    children,
    style,
    position: _position,
    setPosition: _setPosition,
    onDragStart,
    onDragEnd,
    ...boxProps
}: {
    position?: Position;
    setPosition?: (pos: Position) => void;
    onDragStart?: () => void;
    onDragEnd?: () => void;
} & PropsWithChildren & Omit<PolymorphicComponentProps<"div", BoxComponentProps>, "onDragStart" | "onDragEnd">) => {
    const { position, setPosition } = useContext(Transform);

    const { props, isDragging } = useRelativeDrag({
        value: _position || position,
        onChange: _setPosition || setPosition,
    });

    useEffect(() => {
        if(isDragging) onDragStart?.();
        else onDragEnd?.();
    }, [isDragging]);

    return (
        <Box
            w="fit-content"
            h="fit-content"
            {...boxProps}
            onMouseDown={(e) => {
                props.onMouseDown(e);
                boxProps.onMouseDown?.(e);
            }}
            onTouchStart={(e) => {
                boxProps.onTouchStart?.(e);
                props.onTouchStart(e);
            }}
            onTouchEnd={(e) => {
                boxProps.onTouchEnd?.(e);
                props.onTouchEnd(e);
            }}
            style={{
                cursor: isDragging ? "grabbing" : "grab",
                ...style,
            }}
        >
            {children}
        </Box>
    )
};
