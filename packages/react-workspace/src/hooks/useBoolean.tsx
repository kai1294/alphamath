import { useState } from "react";

export const useBoolean = (
    initialState: boolean,
    {
        onTrue,
        onFalse,
    }: {
        onTrue?: () => void;
        onFalse?: () => void;
    }
): [boolean, (b: boolean) => void] => {
    const [bool, setBool] = useState(initialState);

    const setState = (to: boolean) => {
        setBool(b => {
            if(b === to) return b;
            (to ? onTrue : onFalse)?.();
            return to;
        });
    };

    return [bool, setState];
};
