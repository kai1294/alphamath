import { vec2, Vec2 } from "@alan404/vec2";
import { createContext } from "react";

export interface ISize {
    size: Vec2;
    setSize: (size: Vec2) => void;
}

export const SizeContext = createContext<ISize>({
    size: vec2(),
    setSize: () => {},
});
