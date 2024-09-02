import { Item, ItemComponent } from "../../../types/app/item";
import { WithSetters } from "../../../types/utils";
import { TransformProvider } from "../core/Transform";
import { NoteItem } from "./types/NoteItem";
import { ErrorCard } from "../../debug/ErrorCard";
import { DebugItem } from "./types/DebugItem";
import { ContextItem } from "./types/ContextItem";
import { StatementItem } from "./types/StatementItem";
import { match } from "@alan404/enum";
import { Transition } from "@mantine/core";
import { useState } from "react";

export interface ItemRendererProps extends WithSetters<{ item: Item }> {
    onFocus?: () => void;
    onClose?: () => void;
}

export const ItemRenderer = ({
    item,
    setItem,
    onFocus,
    onClose,
}: ItemRendererProps) => {
    const [beingClosed, setBeingClosed] = useState(false);

    let Component = match(item)({
        Note: () => NoteItem,
        Debug: () => DebugItem,
        Context: () => ContextItem,
        Statement: () => StatementItem,
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
            <Transition
                mounted={!beingClosed}
                onExited={() => onClose?.()}
                transition="pop"
            >
                {(style) => (
                    <div style={style}>
                        <Component
                            data={item.data}
                            onChange={(data) => setItem({
                                ...item,
                                data,
                            } as Item)}
                            onFocus={onFocus}
                            onClose={() => {
                                setBeingClosed(true);
                            }}
                        />
                    </div>
                )}
            </Transition>
        </TransformProvider>
    )
};
