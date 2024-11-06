import { Vec2 } from "./vec2";
export declare const vec2client: ({ clientX, clientY }: {
    clientX: number;
    clientY: number;
}) => Vec2;
export type Vec2Like = Partial<Vec2> | number | null | undefined;
export declare const asVec2: (x: Vec2Like) => Vec2;
export declare const vec2eq: (a: Vec2, b: Vec2) => boolean;
