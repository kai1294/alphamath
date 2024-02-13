import { useHotkeys } from "@mantine/hooks";
import React, { useLayoutEffect, useMemo, useRef, useState } from "react";
import { Position } from "../types";

export interface PositionModifiers {
    setX: (x: number) => void,
    setY: (y: number) => void,
    setZ: (scale: number) => void,
}

const GlobalTransform = React.createContext<Position & PositionModifiers>({
    x: 0,
    y: 0,
    z: 0,
    setZ: () => {},
    setX: () => {},
    setY: () => {},
});

const GlobalTransformProvider = ({
    children
}: {
    children: React.ReactNode
}) => {
    let [x, setX] = useState(0);
    let [y, setY] = useState(0);
    let [z, setZ] = useState(1);

    const speed = 5;

    useHotkeys([
        ["w", () => setY(y => y + speed)],
        ["s", () => setY(y => y - speed)],
        ["a", () => setX(x => x + speed)],
        ["d", () => setX(x => x - speed)],
    ]);

    return (
        <GlobalTransform.Provider value={{
            x,
            y,
            z,
            setX,
            setY,
            setZ,
        }}>
            <div
                style={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                    overflow: 'hidden',
                    touchAction: 'none',
                }}
            >
                <div
                    className="coolBackground"
                    style={{
                        width: "100%",
                        height: "100%",
                        display: 'inline-block',
                        transformOrigin: "0 0",
                        transform: `translate3d(${x}em, ${y}em, ${z}em)`,
                    }}
                >
                    <div>
                        {children}
                    </div>
                </div>
            </div>
        </GlobalTransform.Provider>
    );
}

export {
    GlobalTransform,
    GlobalTransformProvider,
}
