import React from "react";



export interface ITransform {
    x: number;
    y: number;
    setX: React.Dispatch<React.SetStateAction<number>>;
    setY: React.Dispatch<React.SetStateAction<number>>;
};

export interface ISize {
    w: number;
    h: number;
}

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
