import React, { PropsWithChildren, useState } from "react";
import { ITransform } from "./types";

const Transform = React.createContext<ITransform>({
    x: 0,
    y: 0,
    setX: (x) => x,
    setY: (x) => x,
});

const TransformProvider = ({
    children,
    initial,
}: {
    initial?: Partial<ITransform>,
} & PropsWithChildren) => {
    let [x, setX] = useState(initial?.x || 0);
    let [y, setY] = useState(initial?.y || 0);
    
    return (
        <Transform.Provider value={{
            x,
            y,
            setX,
            setY,
        }}>
            <div style={{
                transform: `translate(${x}px, ${y}px)`,
                position: "absolute"
            }}>
                {children}
            </div>
        </Transform.Provider>
    );
}

export {
    Transform,
    TransformProvider,
}
