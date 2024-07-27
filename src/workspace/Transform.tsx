import React, { PropsWithChildren, useState } from "react";
import { ITransform, Position, WithSetters } from "./types";

const Transform = React.createContext<WithSetters<ITransform>>({
    position: { x: 0, y: 0 },
    setPosition: () => {},
});

const TransformProvider = ({
    children,
    initial,
}: {
    initial?: Partial<Position>,
} & PropsWithChildren) => {
    let [position, setPosition] = useState({
        x: 0,
        y: 0,
        ...initial,
    });
    
    return (
        <Transform.Provider value={{
            position,
            setPosition,
        }}>
            <div style={{
                transform: `translate(${position.x}px, ${position.y}px)`,
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
