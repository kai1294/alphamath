import { Box } from "@mantine/core";
import { Item } from "../../types/app/item";
import { EnumVariantComponent, match, WithSetters } from "../../types/utils";
import { TransformProvider } from "../workspace/Transform";
import { NoteItem } from "./types/NoteItem";
import { ErrorCard } from "../debug/ErrorCard";
import { DebugItem } from "./types/DebugItem";
import { ContextItem } from "./types/ContextItem";

export const ItemRenderer = ({
    item,
    setItem,
}: WithSetters<{
    item: Item,
}>) => {
    let Component = match(item)({
        Note: () => NoteItem,
        Debug: () => DebugItem,
        Context: () => ContextItem,
        _: () => () => (
            <ErrorCard
                message="Unknown Item"
                description={item.type}
            />
        ),
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
