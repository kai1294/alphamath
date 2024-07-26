import { Stack, TextInput } from "@mantine/core";
import { INotePanel, PanelProps } from "../../workspace/types";

export const NotePanel = ({ data, setData }: PanelProps<INotePanel>) => {
    return (
        <Stack>
            <TextInput
                value={data.content}
                onChange={(e) => setData({ content: e.currentTarget.value })}
            />
        </Stack>
    )
};
