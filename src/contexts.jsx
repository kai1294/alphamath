import React from "react";

/**
 * @type {React.Context<NodeContext>}
 */
const NodeContext = React.createContext({
    value: null,
    setValue: () => {},
    executeAction: () => {},
});

const OptionsContext = React.createContext();

export {
    NodeContext,
    OptionsContext,
}
