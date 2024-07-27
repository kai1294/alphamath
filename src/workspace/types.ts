import React from "react";

export interface Position {
    x: number;
    y: number;
};

export type WithSetters<T extends Record<string, any>> = T & {
    [P in keyof T as `set${Capitalize<string & P>}`]: (v: T[P]) => void;
};

export interface ITransform {
    position: Position;
};

export interface Size {
    w: number | "auto";
    h: number | "auto";
}

export type IWindow = {
    position: Position;
    size: Size;
};

export type IPanel<Type extends string, Data> = { type: Type, data: Data };

export type INotePanel = IPanel<"note", { content: string }>;
export type ITestPanel = IPanel<"test", {}>;

export type PanelProps<P> = P extends IPanel<infer Type, infer Data> ? (
    {
        data: Data,
        setData: (data: Data) => void,
    }
) : never;

export type AnyPanel = ITestPanel | INotePanel;

export type WorkspacePanel = AnyPanel & { x: number; y: number; w: number; h: number; };

export interface IWorkspace {
    title: string;
    panels: WorkspacePanel[];
};
