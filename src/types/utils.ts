export type Enum<T extends Record<string, any>> = {
    [K in keyof T]: { type: K, data: T[K] }
}[keyof T];

export type ExhaustiveMatcher<T extends Record<string, any>, R> = {
    [K in keyof T]: (v: T[K]) => R;
};

export type WildcardMatcher<T extends Record<string, any>, R> = Partial<ExhaustiveMatcher<T, R>> & { _: () => R };

export type Matcher<T extends Record<string, any>, R> = ExhaustiveMatcher<T, R> | WildcardMatcher<T, R>;

export const match = <T extends Record<string, any>, R>(value: Enum<T>) => ((matchers: Matcher<T, R>) => (matchers[value.type] || matchers._)(value.data));

export type WithSetters<T extends Record<string, any>> = T & {
    [P in keyof T as `set${Capitalize<string & P>}`]: (v: T[P]) => void;
};
