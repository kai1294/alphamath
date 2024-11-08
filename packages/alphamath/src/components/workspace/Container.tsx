import { noop } from "@mantine/core";
import { DefaultSize, Size } from "../../types/scalar";
import { WithSetters } from "../../types/utils";
import React, { PropsWithChildren } from "react";
import { useUncontrolled } from "@mantine/hooks";
import { TransformProvider } from "@alan404/react-workspace";
import { vec2, Vec2 } from "@alan404/vec2";

export interface IContainer {
    size: Size;
    position: Vec2;
};

export const Container = React.createContext<WithSetters<IContainer>>({
    size: DefaultSize,
    position: vec2(),
    setPosition: noop,
    setSize: noop,
});

export interface ContainerProps extends WithSetters<IContainer>, PropsWithChildren {
    
};

export const ContainerProvider = ({
    position,
    setPosition,
    size: _size,
    setSize: _setSize,
    children,
}: ContainerProps) => {
    const [size, setSize] = useUncontrolled({
        value: _size,
        finalValue: DefaultSize,
        onChange: _setSize,
    });

    return (
        <Container.Provider
            value={{
                position,
                setPosition,
                size,
                setSize,
            }}
        >
            <TransformProvider
                position={position}
                onChange={setPosition}
            >
                {children}
            </TransformProvider>
        </Container.Provider>
    )
};
