import { vec2, Vec2 } from "@alan404/vec2";
import { createContext } from "react";

export interface ITransform {
    position: Vec2;
    setPosition: (position: Vec2) => void;
}

export const Transform = createContext<ITransform>({
    position: vec2(),
    setPosition: () => {},
});
