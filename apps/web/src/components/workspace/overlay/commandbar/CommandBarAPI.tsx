import React, { useContext } from "react";

export interface ICommandBar {

};

export const CommandBarContext = React.createContext<ICommandBar>({
    
});

export const useCommandBar = () => useContext(CommandBarContext);
