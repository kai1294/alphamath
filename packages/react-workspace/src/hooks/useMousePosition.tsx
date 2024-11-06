import { useMouse } from "@mantine/hooks";
import { useGlobalTransform } from "./useGlobalTransform";
import { Vec2 } from "@alan404/vec2";

/**
 * Hook for getting mouse position relative to the Global Transform
 * @returns The position of the mouse in the viewport
 */
export const useMousePosition = (): Vec2 => {
    const { getAbsolutePosition  } = useGlobalTransform();
    const mouse = useMouse();

    return getAbsolutePosition(mouse);
};
