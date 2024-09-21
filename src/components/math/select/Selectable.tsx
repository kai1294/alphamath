import { PropsWithChildren, useCallback, useContext } from "react";
import { SelectedItem, SelectionContext } from "./SelectionContext"
import { Box } from "@mantine/core";
import { ToolContext } from "@/components/workspace/ToolContext";

export const Selectable = ({
    children,
    value,
}: {
    value: SelectedItem;
} & PropsWithChildren) => {
    const { tool } = useContext(ToolContext);
    const { select, deselect, selections } = useContext(SelectionContext);

    const canSelect = tool.type === "Select";
    const isSelected = selections.some(x => x.id === value.id);

    const toggleSelect = useCallback(() => {
        if(!canSelect) return;
        
        if(isSelected) {
            deselect(value);
        } else {
            select(value);
        }
    }, [tool, isSelected]);

    return (
        <Box
            onMouseUp={e => {
                e.stopPropagation();
                e.preventDefault();

                toggleSelect();
            }}

            style={{
                outline: isSelected ? "solid var(--mantine-color-blue-outline)" : "",
                outlineOffset: "0.2em",
                borderRadius: "var(--mantine-radius-md)",
            }}
        >
            {children}
        </Box>
    )
}
