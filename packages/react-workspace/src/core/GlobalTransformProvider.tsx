import { PropsWithChildren, useState } from "react";
import { Vec2, vec2round } from "@alan404/vec2";
import { GlobalTransform, IGlobalTransform } from "./GlobalTransformContext";
import { useUncontrolled } from "@mantine/hooks";

export interface GlobalTransformProviderProps extends PropsWithChildren, Partial<IGlobalTransform> {};

export const GlobalTransformProvider = ({
    children,
    position: _position,
    initialPosition,
    setPosition: _setPosition,
    scale: _scale,
    initialScale,
    setScale: _setScale,
    maxScale = 2,
    minScale = 0.2,
}: GlobalTransformProviderProps) => {
    const [scale, setScale] = useUncontrolled<number>({
        value: _scale,
        defaultValue: initialScale,
        finalValue: 0.7,
        onChange: _setScale,
    });

    const [position, setPosition] = useUncontrolled<Vec2>({
        value: _position,
        defaultValue: initialPosition,
        finalValue: {
            x: window.innerWidth/2,
            y: window.innerHeight/2
        },
        onChange: _setPosition,
    });

    return (
        <GlobalTransform.Provider value={{
            scale,
            initialScale,
            setScale,
            position,
            initialPosition,
            setPosition: (pos) => setPosition(vec2round(pos)),
            minScale,
            maxScale,
        }}>
            {children}
        </GlobalTransform.Provider>
    )
}
