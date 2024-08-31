import React, { forwardRef, PropsWithChildren, useState } from "react";
import { useUncontrolled } from "@mantine/hooks";
import { DefaultPosition, Position } from "../../types/scalar";
import { WithSetters } from "../../types/utils";
import { Box, BoxComponentProps, noop, PolymorphicComponentProps } from "@mantine/core";

export interface ITransform {
    position: Position;
}

export const Transform = React.createContext<WithSetters<ITransform>>({
    position: DefaultPosition,
    setPosition: noop,
});

export interface TransformProviderOptions {
    defaultValue?: Position;
    value?: Position;
    onChange?: (pos: Position) => void;
}

export type TransformProviderProps = TransformProviderOptions
    & PropsWithChildren
    & Omit<PolymorphicComponentProps<"div", BoxComponentProps>, keyof TransformProviderOptions>

export const TransformProvider = forwardRef<HTMLDivElement, TransformProviderProps>(({
    children,
    defaultValue,
    onChange,
    value,
    style,
    ...props
}, ref) => {
    let [position, setPosition] = useUncontrolled<Position>({
        value,
        defaultValue,
        finalValue: { x: 0, y: 0 },
        onChange,
    });
    
    return (
        <Transform.Provider value={{
            position,
            setPosition,
        }}>
            <Box
                style={{
                    transform: `translate(${position.x}px, ${position.y}px)`,
                    position: "absolute",
                    ...style,
                }}
                {...props}
                ref={ref}
            >
                {children}
            </Box>
        </Transform.Provider>
    );
})


