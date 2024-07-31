import React from "react";
import { MathStatement } from "../model/statement";
import { Enum } from "../utils";
import { Position, Size } from "../scalar";

export type Item = Enum<{
    Note: {
        content: string;
        size: Size;
    };
    Debug: {};
    Statement: {
        statement: MathStatement;
    };
    Context: {
        items: Item[];
        size: Size;
    };
}> & {
    position: Position;
};
