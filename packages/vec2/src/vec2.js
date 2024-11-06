;
/**
 * Vec2 constructor for a single value
 */
export const vec2t = (v) => vec2(v, v);
/**
 * Vec2 constructor
 * @example vec2()
 * @example vec2({ x: 1 })
 * @example vec2(5, -2)
 */
export const vec2 = (x, y) => {
    if (typeof x == "object" && x !== null)
        return { x: x.x || 0, y: x.y || 0 };
    return { x: x || 0, y: y || 0 };
};
