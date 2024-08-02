import { Box, BoxComponentProps, BoxProps, PolymorphicComponentProps } from "@mantine/core";
import { PropsWithChildren, useContext } from "react";
import { Transform } from "./Transform";
import { useRelativeDrag } from "../../hooks/useRelativeDrag";
import { Position } from "../../types/scalar";

export const DragHandle = ({
    children,
    style,
    position: _position,
    setPosition: _setPosition,
    ...boxProps
}: {
    position?: Position;
    setPosition?: (pos: Position) => void;
} & PropsWithChildren & PolymorphicComponentProps<"div", BoxComponentProps>) => {
    const { position, setPosition } = useContext(Transform);

    const { props, isDragging } = useRelativeDrag({
        value: _position || position,
        onChange: _setPosition || setPosition,
    });

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
