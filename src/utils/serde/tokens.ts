import { Enum } from "../../types/utils";

export type MathToken = Enum<{
    Literal: string;
    OpenParen: string;
    CloseParen: string;
    Variable: string;
    Operator: string;
}>;

const is = {
    comma: (ch: string) => ch === ",",
    openParen: (ch: string) => ch === "(",
    closeParen: (ch: string) => ch === ")",
    digit: (ch: string) => /\d/.test(ch),
    letter: (ch: string) => /[a-z]/i.test(ch),
};
