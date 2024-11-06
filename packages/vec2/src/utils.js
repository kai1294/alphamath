import { vec2, vec2t } from "./vec2";
export const vec2client = ({ clientX, clientY }) => vec2(clientX, clientY);
export const asVec2 = (x) => typeof x == "object" && x ? vec2(x) : vec2t(x);
export const vec2eq = (a, b) => a.x == b.x && a.y == b.y;
