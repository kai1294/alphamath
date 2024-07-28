import { useContext } from "react";
import { Transform } from "../workspace/Transform";
import { useRelativeDrag } from "./useRelativeDrag";

export const useHandle = () => {
    const { position, setPosition } = useContext(Transform);

    const { props, isDragging } = useRelativeDrag({
        value: position,
        onChange: setPosition,
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

