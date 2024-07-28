import { Stack, TextInput } from "@mantine/core";
import { PanelProps } from "../../types/app/panels";

export const NotePanel = ({ data, setData }: PanelProps<"note">) => {
    return (
        <Stack>
            <TextInput
                value={data.content}
                onChange={(e) => setData({ content: e.currentTarget.value })}
            />
        </Stack>
    )
};
