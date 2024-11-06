import { asVec2 } from "./utils";
import { vec2 } from "./vec2";
export const vec2add = (...vecs) => {
    return vecs.map(asVec2).reduce((acc, cur) => vec2(acc.x + cur.x, acc.y + cur.y));
};
export const vec2mul = (...vecs) => {
    return vecs.map(asVec2).reduce((acc, cur) => vec2(acc.x * cur.x, acc.y * cur.y));
};
export const vec2sub = (a, b) => vec2add(a, vec2mul(b, -1));
export const vec2div = (a, b) => {
    let _a = asVec2(a);
    let _b = asVec2(b);
    return vec2(_a.x / _b.x, _a.y / _b.y);
};
export const vec2average = (vecs) => vec2div(vec2add(...vecs), vecs.length);
export const vec2middle = (a, b) => vec2average([a, b]);
export const vec2mag = (vec) => {
    let _vec = asVec2(vec);
    return Math.sqrt(_vec.x ** 2 + _vec.y ** 2);
};
export const vec2distance = (a, b) => {
    let _a = asVec2(a);
    let _b = asVec2(b);
    return Math.sqrt((_a.x - _b.x) ** 2 + (_a.y - _b.y) ** 2);
};
export const vec2apply = (vec, fn) => {
    let _vec = asVec2(vec);
    return vec2(fn(_vec.x), fn(_vec.y));
};
export const vec2round = (vec) => vec2apply(vec, Math.round);
export const vec2floor = (vec) => vec2apply(vec, Math.floor);
export const vec2ceil = (vec) => vec2apply(vec, Math.ceil);
export const vec2normalize = (vec) => vec2div(vec, vec2mag(vec));
export const vec2abs = (vec) => vec2apply(vec, Math.abs);
export const vec2dot = (a, b) => {
    let _a = asVec2(a);
    let _b = asVec2(b);
    return vec2(_a.x * _b.x, _a.y * _b.y);
};
