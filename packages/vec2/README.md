# @alan404/vec2

A small `Vec2` type.

```ts
type Vec2 = {
    x: number;
    y: number;
}
```

Includes a bunch of utilities which support both a vec2 and a scalar type:

```ts
let vec = vec2mul(vec2add(vec2(1, 1), vec2({ x: 2, y: 1 })), 6);
let len = vec2mag(vec);

vec2({ x: 1 }) == vec2(1, 0)
vec2() == vec2(0, 0)
```
