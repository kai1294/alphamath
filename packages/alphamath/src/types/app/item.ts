import React from "react";
import { MathStatement } from "../model/statement";
import { EnumVariantComponent } from "../utils";
import { DefaultPosition, DefaultSize, Position, Size, WithId } from "../scalar";
import { id } from "../../utils/id";
import { createFactory, Enum } from "@alan404/enum";
import { MathNode } from "../model/node";

export const Item = createFactory<Item>(({ type }) => ({
    id: id(),
    position: DefaultPosition,
}));

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
    Note: () => Item.Note({
        content: "Enter some text",
        size: { w: 88, h: 25 },
    }),
    Context: () => Item.Context({
        items: [],
        size: DefaultSize,
    }),
    Debug: () => Item.Debug({}),
    Statement: () => Item.Statement({
        statement: MathStatement.Expression(
            MathNode.Multiplication([
                MathNode.Number(5),
                MathNode.Addition([
                    MathNode.Number(1),
                    MathNode.Number(2),
                ]),
            ])
        )
    }),
};
