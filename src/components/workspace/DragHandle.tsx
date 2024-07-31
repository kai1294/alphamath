import { Box, BoxProps } from "@mantine/core";
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
} & PropsWithChildren & BoxProps) => {
    const { position, setPosition } = useContext(Transform);

    const { props, isDragging } = useRelativeDrag({
        value: _position || position,
        onChange: _setPosition || setPosition,
    });

    return (
        <Box
            w="fit-content"
            h="fit-content"
            {...props}
            {...boxProps}
            style={{
                cursor: isDragging ? "grabbing" : "grab",
                ...style,
            }}
        >
            {children}
        </Box>
    )
};
