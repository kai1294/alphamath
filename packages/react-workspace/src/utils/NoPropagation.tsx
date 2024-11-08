import { forwardRef, useImperativeHandle, useRef } from "react";
import { useElementEvent } from "../hooks";

export const NoPropagation = forwardRef<HTMLDivElement, JSX.IntrinsicElements["div"]>((props, fwd) => {
    const ref = useRef<HTMLDivElement | null>(null);
    useImperativeHandle(fwd, () => ref.current);

    useElementEvent(ref, "mousedown", e => e.stopPropagation());
    useElementEvent(ref, "touchstart", e => e.stopPropagation());
    
    return (
        <div
            {...props}
            ref={ref}
        />
    )
});
