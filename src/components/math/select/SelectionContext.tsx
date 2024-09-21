import { MathNode } from "@/types/model/node";
import { noop } from "@mantine/core";
import { useListState } from "@mantine/hooks";
import { createContext, PropsWithChildren } from "react";

export type SelectedItem = MathNode;

export interface ISelectionContext {
    selections: SelectedItem[];
    select: (item: SelectedItem) => void;
    deselect: (item: SelectedItem) => void;
    deselectAll: () => void;
}

export const SelectionContext = createContext<ISelectionContext>({
    selections: [],
    select: noop,
    deselect: noop,
    deselectAll: noop,
});

export const SelectionContextProvider = ({ children }: PropsWithChildren) => {
    const [selections, handlers] = useListState<SelectedItem>([]);

    const select = (item: SelectedItem) => {
        handlers.append(item);
    };

    const deselect = (item: SelectedItem) => {
        handlers.filter(x => x.id !== item.id);
    };

    const deselectAll = () => handlers.setState([]);
    
    return (
        <SelectionContext.Provider
            value={{
                selections,
                select,
                deselect,
                deselectAll,
            }}
        >
            {children}
        </SelectionContext.Provider>
    )
}

