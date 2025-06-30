import { childMathNodes, isMathNodeInside, MathNode } from "../../../types/model/node";
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
        /* handlers.setState((li) => {
            if(li.some(x => x.id == item.id)) return li;

            if(li.some(x => isMathNodeInside(x, item))) return li;

            let children = childMathNodes(item);
            if(children.some(x => li.some(s => s.id == x.id)))
                return [...li.filter(x => !children.some(c => c.id == x.id)), item];

            if(children.every(x => li.some(s => x.id == s.id)))
                return [];

            return [...li, item];
        }); */
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

