import { useMouse } from "@mantine/hooks";
import { useContext } from "react";
import { GlobalTransform } from "../workspace/GlobalTransform";
import { Position } from "../workspace/types";

export const useMousePosition = (): Position => {
    const { position, scale } = useContext(GlobalTransform);
    const mouse = useMouse();

    return {
        x: Math.round((mouse.x - position.x) / scale),
        y: Math.round((mouse.y - position.y) / scale),
    };
};
