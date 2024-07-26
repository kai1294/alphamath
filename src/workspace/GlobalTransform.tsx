import React, { PropsWithChildren, useState } from "react";

export interface IGlobalTransform {
    x: number;
    y: number;
    scale: number;
}

export const GlobalTransform = React.createContext<IGlobalTransform>({
    x: 0,
    y: 0,
    scale: 0,
});

export const GlobalTransformProvider = ({ children }: PropsWithChildren) => {
    const [scale, setScale] = useState(1);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    return (
        <GlobalTransform.Provider value={{ scale, ...position }}>
            {children}
        </GlobalTransform.Provider>
    )
}
