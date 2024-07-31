import React, { PropsWithChildren, useState } from "react";
import { Tool } from "../../types/app/tools";
import { WithSetters } from "../../types/utils";

export interface ITool {
    tool: Tool;
}

export const ToolContext = React.createContext<WithSetters<ITool>>({
    tool: { type: "pan", data: {} },
    setTool: () => {},
});

export const ToolProvider = ({ children }: PropsWithChildren) => {
    const [tool, setTool] = useState<Tool>({ type: "pan", data: {} });
    
    return (
        <ToolContext.Provider value={{
            tool,
            setTool,
        }}>
            {children}
        </ToolContext.Provider>
    )
};
