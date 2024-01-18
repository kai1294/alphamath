import { KeyboardSensor, MouseSensor, PointerSensor, TouchSensor, useSensor, useSensors } from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";

export const matches = (f, p) => f.toString()
    .replace(/[ ]/g, "")
    .split("=>")[0] == (p.length == 1 ? p : `(${p.join(", ")})`);

export const match =
    <T extends string>(v: T) =>
    <M extends Record<T, V>>(o: M): ((M[T] extends (() => A) ? A : M[T])) => {
    let fn;

    if (Array.isArray(o)) {
        fn = (o.find(f => matches(f, v)) || o.find(f => matches(f, "_")))
    } else {
        fn = (o[v] || o._)
    };

    if (typeof fn == "function") {
        return fn(v);
    } else {
        return fn;
    }
};


export const useDndSensors = () => {
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

export const primeFactors = (n) => {
	const factors = [];
	let divisor = 2;

	while (n >= 2) {
		if (n % divisor == 0) {
			factors.push(divisor);
			n = n / divisor;
		} else {
			divisor++;
		}
	}

	return factors;
};

export const isPrime = (n) => {
    return primeFactors(n).length <= 1;
}
