import { id } from "@/utils/id";

export const noop = () => {};

export const WithId = () => ({ id: id() });
export type WithId = { id: string };

export interface Position {
    x: number;
    y: number;
}

export const DefaultPosition: Position = { x: 0, y: 0 };

export interface Size {
    w: number;
    h: number;
}

export const DefaultSize: Size = { w: 500, h: 500 };

