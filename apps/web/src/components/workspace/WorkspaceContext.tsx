import React, { PropsWithChildren, useState } from "react";
import { IWorkspace } from "../../types/app/workspace";
import { WithSetters } from "../../types/utils";
import { useHotkeys } from "@mantine/hooks";
import { noop } from "@mantine/core";
import { Item } from "../../types/app/item";
import { id } from "../../utils/id";

export const WorkspaceContext = React.createContext<WithSetters<IWorkspace>>({
    title: "",
    items: [],
    setItems: noop,
    setTitle: noop,
});

export const WorkspaceProvider = ({ children }: PropsWithChildren) => {
    const [title, setTitle] = useState("");
    const [items, setItems] = useState<Item[]>([]);
    
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
