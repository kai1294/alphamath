import { Vec2 } from "@alan404/vec2";
import { useRelativeDrag, useTransform } from "../hooks/index.js";
import { forwardRef } from "react";
import { mergeProps } from "../utils/index.js";

export type DragHandleProps = {
    position?: Vec2;
    setPosition?: (pos: Vec2) => void;
    onDragStart?: () => void;
    onDragEnd?: () => void;
    withCursor?: boolean;
    disabled?: boolean;
} & Omit<JSX.IntrinsicElements["div"], "onDragStart" | "onDragEnd">;

export const DragHandle = forwardRef<HTMLDivElement, DragHandleProps>(({
    children,
    style,
    withCursor,
    position: _position,
    setPosition: _setPosition,
    onDragStart,
    onDragEnd,
    disabled,
    ...props
}, ref) => {
    const { position, setPosition } = useTransform();

    const { isDragging, props: _props } = useRelativeDrag({
        position: _position || position,
        onDrag: _setPosition || setPosition,
        onDragStart,
        onDragEnd,
        disabled,
    });

    return (
        <div
            {...mergeProps(
                props,
                _props
            )}
            ref={ref}
            data-dragging={isDragging}
            style={{
                cursor: withCursor !== false ? (isDragging ? "grabbing" : "grab") : undefined,
                ...style,
            }}
        >
            {children}
        </div>
    )
});
