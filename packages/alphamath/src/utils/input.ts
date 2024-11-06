import React from "react";

export const MouseButtons = ["left", "right", "middle", "back", "forward"] as const;

export const mouseButtons = (e: MouseEvent | React.MouseEvent<HTMLElement>): Record<typeof MouseButtons[number], boolean> => {
    return Object.fromEntries(MouseButtons.map((btn, i) => [btn as typeof MouseButtons[number], !!(e.buttons & (1 << i))])) as any;
};
