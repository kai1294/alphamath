import { useHotkeys } from "@mantine/hooks";
import React, { useLayoutEffect, useMemo, useRef, useState } from "react";

const GlobalTransform = React.createContext();

const GlobalTransformProvider = ({ children }) => {
    let [x, setX] = useState(0);
    let [y, setY] = useState(0);
    let [scale, setScale] = useState(1);

    const speed = 1;

    useHotkeys([
        ["w", () => setY(y => y - speed)],
        ["s", () => setY(y => y + speed)],
        ["a", () => setX(x => x - speed)],
        ["d", () => setX(x => x + speed)],
    ]);

    return (
        <GlobalTransform.Provider value={{
            x,
            y,
            setX,
            setY,
            scale,
            setScale,
        }}>
            {children}
            {/* <div
                style={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                    overflow: 'hidden',
                    touchAction: 'none',
                    cursor: "all-scroll",
                }}
            >
                <div style={{
                    display: 'inline-block',
                    transformOrigin: "0 0",
                    transform: `translate3d(${x}em, ${y}em, ${scale}em)`,
                    cursor: "auto",
                }}>
                    {children}
                </div>
            </div> */}
        </GlobalTransform.Provider>
    );
}

export {
    GlobalTransform,
    GlobalTransformProvider,
}
