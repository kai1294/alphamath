import { forwardRef, PropsWithChildren, ReactNode, useImperativeHandle, useRef } from "react";
import { BackgroundGrid } from "./BackgroundGrid.js";
import { WorkspaceView } from "./WorkspaceView.js";
import { usePanning } from "../hooks/index.js";

export interface WorkspaceProps extends PropsWithChildren {
    background?: ReactNode;
    withCursor?: boolean;
}

export const Workspace = forwardRef<HTMLDivElement, WorkspaceProps>(({
    background,
    children,
    withCursor = true,
}, ref) => {
    const { isPanning, props } = usePanning();

    return (
        <div>
            {background ?? <BackgroundGrid />}
            <WorkspaceView
                ref={ref}
                {...props}
                style={{
                    cursor: withCursor ? (isPanning ? "grabbing" : "all-scroll") : undefined,
                }}
            >
                {children}
            </WorkspaceView>
        </div>
    )
});
