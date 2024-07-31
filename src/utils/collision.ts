import { Position, Size } from "../types/scalar";

const toAABB = (a: Position & Size) => ({
    minX: a.x,
    minY: a.y,
    maxX: a.x + a.w,
    maxY: a.y + a.h,
});

export const isColliding = (_a: Position & Size, _b: Position & Size) => {
    let a = toAABB(_a);
    let b = toAABB(_b);

    return (
        a.minX <= b.maxX &&
        a.maxX >= b.minX &&
        a.minY <= b.maxY &&
        a.maxY >= b.minY
    )
}

export const ensureInsideContainer = (container: Size, actor: Size & Position): Size & Position => ({
    ...actor,
    x: Math.max(actor.x, 0),
    y: Math.max(actor.y, 0),
});
