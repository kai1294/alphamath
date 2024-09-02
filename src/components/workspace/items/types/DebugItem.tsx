import { Text } from "@mantine/core";
import { ItemComponent } from "../../../../types/app/item";
import { PanelWindow } from "../../util/PanelWindow";
import { useContext } from "react";
import { WorkspaceContext } from "../../WorkspaceContext";

export const DebugItem: ItemComponent<"Debug"> = ({ onFocus, onClose }) => {
    const { items } = useContext(WorkspaceContext);

    return (
        <PanelWindow
            title="Debug"
            onFocus={onFocus}
            onClose={onClose}
        >
            <Text ff="monospace" p="sm" style={{ whiteSpace: "pre", inlineSize: "min-content" }} w="fit-content">
                {JSON.stringify(items, null, 2)}
            </Text>
        </PanelWindow>
    )
}
