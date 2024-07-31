import { Box } from "@mantine/core";
import { Item } from "../../types/app/item";
import { EnumVariantComponent, match, WithSetters } from "../../types/utils";
import { TransformProvider } from "../workspace/Transform";
import { NoteItem } from "./types/NoteItem";

export const ItemRenderer = ({
    item,
    setItem,
}: WithSetters<{
    item: Item,
}>) => {
    let Component = match(item)({
        Note: () => NoteItem,
        _: () => () => "meow",
    }) as EnumVariantComponent<Item, typeof item["type"]>;

    return (
        <TransformProvider value={item.position} onChange={(position) => setItem({
            ...item,
            position,
        })}>
            <Component
                data={item.data}
                onChange={(data) => setItem({
                    ...item,
                    data,
                } as Item)}
            />
        </TransformProvider>
    )
};
