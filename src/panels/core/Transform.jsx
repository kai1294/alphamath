import React, { useContext, useState } from "react";
import { GlobalTransform } from "./GlobalTransform";
import { DndContext } from "@dnd-kit/core";
import { useDndSensors } from "../../utils";

const Transform = React.createContext();

const TransformProvider = ({ children }) => {
    const sensors = useDndSensors();
    const { x: globalX, y: globalY, scale: globalScale } = useContext(GlobalTransform);
    let [x, setX] = useState(0);
    let [y, setY] = useState(0);
    
    return (
        <Transform.Provider value={{
            x,
            y,
            setX,
            setY,
        }}>
            <DndContext sensors={sensors} onDragEnd={({ delta }) => {
                setX(x => x + delta.x);
                setY(y => y + delta.y);
            }}>
                <div style={{
                    transform: `translate(${globalX + x}px, ${globalY + y}px)`
                }}>
                    {children}
                </div>
            </DndContext>
        </Transform.Provider>
    );
}

export {
    Transform,
    TransformProvider,
}
