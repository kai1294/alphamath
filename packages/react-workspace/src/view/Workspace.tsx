import { forwardRef, PropsWithChildren, ReactNode, useImperativeHandle, useRef } from "react";
import { BackgroundGrid } from "./BackgroundGrid";
import { WorkspaceView } from "./WorkspaceView";
import { usePanning } from "../hooks";
import { mergeProps } from "../utils";

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
