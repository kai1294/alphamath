import React from "react";

export interface Cursor {
    
}

export interface Cursors {
    cursors: Cursor[],
}

export const CursorsContext = React.createContext<Cursors>({
    cursors: [],
})
