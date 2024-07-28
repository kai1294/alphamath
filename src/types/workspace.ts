import { AnyPanel } from "./panels";
import { Position, Size } from "./scalar";

export interface WorkspacePanel {
    panel: AnyPanel;
    size: Size;
    position: Position;
};

export interface IWorkspace {
    title: string;
    panels: WorkspacePanel[];
};



