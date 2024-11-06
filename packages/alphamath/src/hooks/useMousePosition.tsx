import { useMouse } from "@mantine/hooks";
import { useContext } from "react";
import { Position } from "../types/scalar";
import { GlobalTransform } from "../components/workspace/core/GlobalTransform";

export const useMousePosition = (): Position => {
    const { position, scale } = useContext(GlobalTransform);
    const mouse = useMouse();

    return {
        x: Math.round((mouse.x - position.x) / scale),
        y: Math.round((mouse.y - position.y) / scale),
    };
};
