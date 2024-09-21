import { createFactory, Enum } from "@alan404/enum";

export const Tool = createFactory<Tool>();
export type Tool = Enum<{
    Pan: {};
    Select: {
        selectedIds: string[];
    };
    Edit: {};
}>;
