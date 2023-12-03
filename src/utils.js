import { KeyboardSensor, MouseSensor, PointerSensor, TouchSensor, useSensor, useSensors } from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";

const matches = (f, p) => f.toString()
    .replace(/[ ]/g, "")
    .split("=>")[0] == (p.length == 1 ? p : `(${p.join(", ")})`);

const match = (...v) => {
    let matcher = (o) => {
        let fn;

        if (Array.isArray(o)) {
            fn = (o.find(f => matches(f, v)) || o.find(f => matches(f, "_")))
        } else {
            fn = (o[v.join(", ")] || o._)
        };

        if (typeof fn == "function") {
            return fn(...v);
        } else {
            return fn;
        }
    };

    return matcher;
};

const useDndSensors = () => {
    return useSensors(
        useSensor(MouseSensor, {
            activationConstraint: {
                distance: 10,
            },
        }),
        useSensor(TouchSensor, {
            activationConstraint: {
                distance: 10,
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        }),
    );
};

export {
    match,
    matches,
    useDndSensors,
};
