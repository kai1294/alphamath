/**
 * The Vec2 type
 */
export type Vec2 = {
    x: number;
    y: number;
};

interface Vec2Contructor {
    (vec: Partial<Vec2>, _: void): Vec2;
    (x?: number | null, y?: number | null): Vec2;
};

/**
 * Vec2 constructor for a single value
 */
export const vec2t = (v?: number | null) => vec2(v, v);

/**
 * Vec2 constructor
 * @example vec2()
 * @example vec2({ x: 1 })
 * @example vec2(5, -2)
 */
export const vec2: Vec2Contructor = (x, y): Vec2 => {
    if(typeof x == "object" && x !== null) return { x: x.x || 0, y: x.y || 0 };
    return { x: x || 0, y: y || 0 };
}
