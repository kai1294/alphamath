export type Obj = Record<string, any>;

export type Enum<T extends Obj> = {
    [K in keyof T]: { type: K, data: T[K] }
}[keyof T];

export type ExhaustiveMatcher<T extends Enum<Obj>, R> = {
    [P in Extract<T["type"], string>]: (v: Extract<T, { type: P }>["data"]) => R;
};

export type WildcardMatcher<T extends Enum<Obj>, R> = Partial<ExhaustiveMatcher<T, R>> & { _: () => R };

export type Matcher<T extends Enum<Obj>, R> = ExhaustiveMatcher<T, R> | WildcardMatcher<T, R>;

export const match = <T extends Enum<Obj>, R>(value: T) =>
    ((matchers: Matcher<T, R>) =>
        (matchers[value.type as keyof typeof matchers] || ((matchers as WildcardMatcher<T, R>)._))(value.data));

export type WithSetters<T extends Obj> = T & {
    [P in keyof T as `set${Capitalize<string & P>}`]: (v: T[P]) => void;
};
