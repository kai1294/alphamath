import { forwardRef, PropsWithChildren, useImperativeHandle, useRef } from "react";
import { useUncontrolled } from "@mantine/hooks";
import { Transform } from "./TransformContext";
import { Vec2 } from "@alan404/vec2";
import { useElementEvent } from "../hooks";

export interface TransformProviderOptions {
    initialPosition?: Vec2;
    position?: Vec2;
    onChange?: (position: Vec2) => void;
}

export type TransformProviderProps = TransformProviderOptions
    & PropsWithChildren
    & Omit<JSX.IntrinsicElements["div"], keyof TransformProviderOptions>

export const TransformProvider = forwardRef<HTMLDivElement, TransformProviderProps>(({
    children,
    initialPosition,
    onChange,
    position: _position,
    style,
    ...props
}, ref) => {
    let [position, setPosition] = useUncontrolled<Vec2>({
        value: _position,
        defaultValue: initialPosition,
        finalValue: { x: 0, y: 0 },
        onChange,
    });
    
    return (
        <Transform.Provider value={{
            position,
            setPosition,
        }}>
            <div
                style={{
                    transform: `translate(${position.x}px, ${position.y}px)`,
                    position: "absolute",
                    ...style,
                }}
                {...props}
                ref={ref}
            >
                {children}
            </div>
        </Transform.Provider>
    );
})

