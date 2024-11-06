import { MathNode } from "@/types/model/node";
import { createContext } from "react";

export interface IDraggedNodeContext {
    hand: MathNode[];
}

export const DraggedNodeContext = createContext<IDraggedNodeContext>({
    hand: [],
});


