import { Text } from "@mantine/core";
import { Item, ItemComponent } from "../../../types/app/item";
import { EnumVariantComponent } from "../../../types/utils";
import { PanelWindow } from "../../panels/PanelWindow";
import { useContext } from "react";
import { WorkspaceContext } from "../../workspace/WorkspaceContext";

export const DebugItem: ItemComponent<"Debug"> = ({ onFocus }) => {
    const { items } = useContext(WorkspaceContext);

    return (
        <PanelWindow title="Debug: WorkspaceContext.items" onFocus={onFocus}>
            <Text ff="monospace" p="sm" style={{ whiteSpace: "pre", inlineSize: "min-content" }} w="fit-content">
                {JSON.stringify(items, null, 2)}
            </Text>
        </PanelWindow>
    )
}
