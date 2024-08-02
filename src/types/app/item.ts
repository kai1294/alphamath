import React from "react";
import { MathStatement } from "../model/statement";
import { Enum, EnumVariantComponent } from "../utils";
import { Position, Size, WithId } from "../scalar";

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
} & WithId;

export type ItemComponent<Ty extends Item["type"]> = EnumVariantComponent<Item, Ty, { onFocus?: () => void }>;
