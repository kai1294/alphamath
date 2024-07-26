import { Stack } from "@mantine/core";
import { ITestPanel, PanelProps } from "../../workspace/types";

export const TestPanel = ({}: PanelProps<ITestPanel>) => {
    return (
        <Stack>
            Hello World!
        </Stack>
    )
};
