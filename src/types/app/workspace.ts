import { IPanel } from "./panels";
import { Position, Size } from "../scalar";

export interface WorkspacePanel {
    panel: IPanel;
    size: Size;
    position: Position;
};

export interface IWorkspace {
    title: string;
    panels: WorkspacePanel[];
};



