import { Vec2 } from "@alan404/vec2";
import { Size } from "../types/scalar";

const toAABB = (a: Vec2 & Size) => ({
    minX: a.x,
    minY: a.y,
    maxX: a.x + a.w,
    maxY: a.y + a.h,
});

export const isColliding = (_a: Vec2 & Size, _b: Vec2 & Size) => {
    let a = toAABB(_a);
    let b = toAABB(_b);

    return (
        a.minX <= b.maxX &&
        a.maxX >= b.minX &&
        a.minY <= b.maxY &&
        a.maxY >= b.minY
    )
}

export const ensureInsideContainer = (container: Size, actor: Size & Vec2): Size & Vec2 => ({
    ...actor,
    x: Math.max(actor.x, 0),
    y: Math.max(actor.y, 0),
});
