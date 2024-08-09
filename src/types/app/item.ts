import React from "react";
import { MathStatement } from "../model/statement";
import { Enum, EnumVariantComponent } from "../utils";
import { DefaultPosition, DefaultSize, Position, Size, WithId } from "../scalar";
import { id } from "../../utils/id";

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

export type ItemComponent<Ty extends Item["type"]> = EnumVariantComponent<Item, Ty, {
    onFocus?: () => void;
    onClose?: () => void;
}>;

export const createNew: Partial<Record<Item["type"], () => Item>> = {
    Note: () => ({
        position: DefaultPosition,
        id: id(),
        type: "Note",
        data: {
            content: "Enter some text",
            size: { w: 88, h: 25 },
        },
    }),
    Context: () => ({
        position: DefaultPosition,
        type: "Context",
        data: { items: [], size: DefaultSize },
        id: id(),
    }),
    Debug: () => ({
        position: DefaultPosition,
        type: "Debug",
        data: {  },
        id: id(),
    }),
    Statement: () => ({
        position: DefaultPosition,
        type: "Statement",
        data: { statement: { type: "Expression", data: {
            type: "Addition",
            data: [
                { type: "Number", data: 1, id: id() },
                { type: "Number", data: 2, id: id() },
            ],
            id: id(),
        } } },
        id: id(),
    }),
};
