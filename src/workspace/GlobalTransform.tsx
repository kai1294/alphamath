import React, { PropsWithChildren, useState } from "react";
import { Position } from "../types/scalar";
import { WithSetters } from "../types/utils";
import { useHotkeys } from "@mantine/hooks";

export interface IGlobalTransform {
    position: Position;
    scale: number;
}

export interface IGlobalTransformUtils {
    center: () => void;
    reset: () => void;
}

export const GlobalTransform = React.createContext<WithSetters<IGlobalTransform> & IGlobalTransformUtils>({
    position: { x: 0, y: 0 },
    scale: 1,
    setPosition: () => {},
    setScale: () => {},
    center: () => {},
    reset: () => {},
});

export const GlobalTransformProvider = ({ children }: PropsWithChildren) => {
    const [scale, setScale] = useState(0.7);
    const [position, setPosition] = useState({ x: window.innerWidth/2, y: window.innerHeight/2 });

    const move = ({ x = 0, y = 0 }: Partial<Position>) => {
        setPosition((a) => ({ x: a.x + x, y: a.y + y }));
    };

    let s = 10;
    useHotkeys([
        ["w", () => move({ y: s })],
        ["s", () => move({ y: -s })],
        ["a", () => move({ x: s })],
        ["d", () => move({ x: -s })],
    ]);

    const center = () => {
        setPosition({ x: window.innerWidth/2, y: window.innerHeight/2 })
    };

    const reset = () => {
        center();
        setScale(0.7);
    };

    return (
        <GlobalTransform.Provider value={{
            scale,
            setScale,
            position,
            setPosition,

            center,
            reset,
        }}>
            {children}
        </GlobalTransform.Provider>
    )
}
