import { Box } from "@mantine/core";
import { Item, ItemComponent } from "../../types/app/item";
import { EnumVariantComponent, match, WithSetters } from "../../types/utils";
import { TransformProvider } from "../workspace/Transform";
import { NoteItem } from "./types/NoteItem";
import { ErrorCard } from "../debug/ErrorCard";
import { DebugItem } from "./types/DebugItem";
import { ContextItem } from "./types/ContextItem";

export const ItemRenderer = ({
    item,
    setItem,
    onFocus,
}: WithSetters<{
    item: Item,
}> & {
    onFocus?: () => void,
}) => {
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
    }) as ItemComponent<typeof item["type"]>;

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
                onFocus={onFocus}
            />
        </TransformProvider>
    )
};
