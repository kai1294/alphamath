import { PropsWithChildren } from "react";
import { CommandBarContext } from "./CommandBarAPI";

export const CommandBarProvider = ({
    children
}: PropsWithChildren) => {
    
    
    return (
        <CommandBarContext.Provider
            value={{

            }}
        >
            {children}
        </CommandBarContext.Provider>
    )
};
