
export type WithSetters<T extends Record<string, any>> = T & {
    [P in keyof T as `set${Capitalize<string & P>}`]: (v: T[P]) => void;
};
