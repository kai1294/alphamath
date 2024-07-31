import { Enum } from "../utils";

export type IPanel = Enum<{
    note: { content: string },
    test: {},
}>;

export type PanelProps<Id extends IPanel["type"]> = {
    data: Extract<IPanel, { type: Id }>["data"];
    setData: (v: Extract<IPanel, { type: Id }>["data"]) => void;
};

