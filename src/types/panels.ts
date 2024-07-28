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

