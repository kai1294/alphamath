import { vec2, Vec2, vec2t } from "./vec2.js";

export const vec2client = ({ clientX, clientY }: { clientX: number; clientY: number }) =>
    vec2(clientX, clientY);

export type Vec2Like = Partial<Vec2> | number | null | undefined;
export const asVec2 = (x: Vec2Like) => typeof x == "object" && x ? vec2(x) : vec2t(x);

export const vec2eq = (a: Vec2, b: Vec2) => a.x == b.x && a.y == b.y;
