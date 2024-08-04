import { useTimeout } from "@mantine/hooks";
import React, { SetStateAction, useState } from "react";

export const useFadingState = <T,>(
    initialState: T | (() => T),
    defaultTo: React.SetStateAction<T>,
    fadeTime: number,
): [T, React.Dispatch<React.SetStateAction<T>>] => {
    const [state, setState] = useState<T>(initialState);
    const { clear, start } = useTimeout(() => {
        setState(defaultTo);
    }, fadeTime);

    return [
        state,
        (action: SetStateAction<T>) => {
            setState(action);
            clear();
            start();
        },
    ];
};
