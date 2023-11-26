const matches = (f, p) => f.toString()
    .replace(/[ ]/g, "")
    .split("=>")[0] == (p.length == 1 ? p : `(${p.join(", ")})`);

const match = (...v) => (o) => (
    Array.isArray(o) ?
        (o.find(f => matches(f, v)) || o.find(f => matches(f, "_")))
        : (o[v.join(", ")] || o._)
)();

export {
    match,
    matches,
};
