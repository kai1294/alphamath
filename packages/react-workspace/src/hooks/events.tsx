import React from "react";

export type MouseEv = React.MouseEventHandler<HTMLElement>;
export type TouchEv = React.TouchEventHandler<HTMLElement>;

export type MouseEvents = Pick<
    React.DOMAttributes<HTMLElement>,
    "onMouseDown" | "onMouseMove" | "onMouseUp" | "onWheel"
>;

export type TouchEvents = Pick<
    React.DOMAttributes<HTMLElement>,
    "onTouchStart" | "onTouchMove" | "onTouchEnd"
>;


