import { id } from "@/utils/id";

export const noop = () => {};

export const WithId = () => ({ id: id() });
export type WithId = { id: string };

export interface Size {
    w: number;
    h: number;
}

export const DefaultSize: Size = { w: 500, h: 500 };

