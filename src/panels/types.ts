import React from "react";

export interface Position {
    x: number;
    y: number;
    z: number;
}

export interface Window {
    id: string;
    position: Position;
    component: React.Component;
}

export interface IWorkspace {
    windows: Window[];

}

export const WorkspaceContext = React.createContext<IWorkspace>({
    windows: [],
});
