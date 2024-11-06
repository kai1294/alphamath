import { useContext } from "react";
import { DraggedNodeContext } from "./DraggedNodeContext";

export const HandOverlay = () => {
    const { hand } = useContext(DraggedNodeContext);
    
    return (
        "meow"
    )
};
