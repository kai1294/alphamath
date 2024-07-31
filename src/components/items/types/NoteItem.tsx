import { useContext } from "react";
import { ToolContext } from "../../workspace/ToolContext";
import { PanelWindow } from "../../panels/PanelWindow";
import { EnumVariantComponent } from "../../../types/utils";
import { Item } from "../../../types/app/item";
import { Text, Textarea, TextInput } from "@mantine/core";

export const NoteItem: EnumVariantComponent<Item, "Note"> = ({
    data,
    onChange,
}) => {
    const { tool } = useContext(ToolContext);
    
    return (
        <PanelWindow
            title="Note"
            size={data.size}
            resizable={tool.type == "edit"}
            onResize={(size) => onChange({ ...data, size })}
        >
            {tool.type == "edit" ? (
                <Textarea
                    ff="monospace"
                    value={data.content}
                    onChange={(e) => onChange({
                        ...data,
                        content: e.currentTarget.value,
                    })}
                    styles={{
                        wrapper: { height: "100%" },
                        input: { height: "100%" },
                    }}
                    w="100%"
                    h="100%"
                />
            ) : (
                <Text ff="monospace" p="sm" style={{ whiteSpace: "pre", inlineSize: "min-content" }} w="fit-content">
                    {data.content}
                </Text>
            )}
        </PanelWindow>
    )
};
