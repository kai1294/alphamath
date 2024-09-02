import { noop } from "@mantine/core";
import { DefaultPosition, DefaultSize, Position, Size } from "../../../types/scalar";
import { WithSetters } from "../../../types/utils";
import React, { PropsWithChildren } from "react";
import { useUncontrolled } from "@mantine/hooks";
import { TransformProvider } from "./Transform";

export interface IContainer {
    size: Size;
    position: Position;
};

export const Container = React.createContext<WithSetters<IContainer>>({
    size: DefaultSize,
    position: DefaultPosition,
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
                value={position}
                onChange={setPosition}
            >
                {children}
            </TransformProvider>
        </Container.Provider>
    )
};
