export const noop = () => {};

export interface Position {
    x: number;
    y: number;
}

export const DefaultPosition: Position = { x: 0, y: 0 };

export interface Size {
    w: number | "auto";
    h: number | "auto";
}

export const DefaultSize: Size = { w: "auto", h: "auto" };

