import { Enum, EnumData } from "@alan404/enum";

export type Obj = Record<string, any>;

export type WithSetters<T extends Obj> = T & {
    [P in keyof T as `set${Capitalize<string & P>}`]: (v: T[P]) => void;
};

export type EnumVariantComponent<E extends Enum<Obj>, Variant extends E["type"], P = {}> = React.FC<{
    data: EnumData<E, Variant>;
    onChange: (data: EnumData<E, Variant>) => void;
} & P>;
