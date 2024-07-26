import { MathNode } from "../../../types";

export interface Action {
    id: string;
    name: string;
    filter: (node: MathNode) => boolean;
    apply: (node: MathNode) => MathNode;
};
