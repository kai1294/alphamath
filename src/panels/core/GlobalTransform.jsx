import React, { useState } from "react";
import { useDndSensors } from "../../utils";
import { DndContext } from "@dnd-kit/core";

const GlobalTransform = React.createContext();

const GlobalTransformProvider = ({ children }) => {
    let [x, setX] = useState(0);
    let [y, setY] = useState(0);
    let [scale, setScale] = useState(1);
    
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
        </GlobalTransform.Provider>
    );
}

export {
    GlobalTransform,
    GlobalTransformProvider,
}
