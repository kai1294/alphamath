import React, { PropsWithChildren, useState } from "react";
import { IWorkspace } from "../types/app/workspace";

export const WorkspaceContext = React.createContext<IWorkspace>({
    title: "",
    panels: [],
});

export const WorkspaceProvider = ({ children }: PropsWithChildren) => {
    const [title, setTitle] = useState("");
    const [panels, setPanels] = useState([]);
    
    return (
        <WorkspaceContext.Provider value={{
            title,
            panels,
        }}>
            {children}
        </WorkspaceContext.Provider>
    )
};
