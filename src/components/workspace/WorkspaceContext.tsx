import React, { PropsWithChildren, useState } from "react";
import { IWorkspace } from "../../types/app/workspace";
import { WithSetters } from "../../types/utils";
import { useHotkeys } from "@mantine/hooks";
import { noop } from "@mantine/core";
import { Item } from "../../types/app/item";

export const WorkspaceContext = React.createContext<WithSetters<IWorkspace>>({
    title: "",
    items: [],
    setItems: noop,
    setTitle: noop,
});

export const WorkspaceProvider = ({ children }: PropsWithChildren) => {
    const [title, setTitle] = useState("");
    const [items, setItems] = useState<Item[]>([
        { type: "Debug", data: {}, position: { x: 0, y: -200 } }
    ]);

    useHotkeys([
        ["n", () => setItems([
            ...items,
            { type: "Note", data: {
                content: "",
                size: { w: 200, h: 100 },
            }, position: { x: 0, y: 0 } }])],
        ["c", () => setItems([
            ...items,
            { type: "Context", data: {
                items: [],
                size: { w: 500, h: 400 },
            }, position: { x: 0, y: 0 } }])],
    ]);
    
    return (
        <WorkspaceContext.Provider value={{
            title,
            setTitle,
            items,
            setItems,
        }}>
            {children}
        </WorkspaceContext.Provider>
    )
};
