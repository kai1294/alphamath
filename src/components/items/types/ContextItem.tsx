import { Box, Group, Stack } from "@mantine/core";
import { Item } from "../../../types/app/item";
import { EnumVariantComponent } from "../../../types/utils";
import { DragHandle } from "../../workspace/DragHandle";

export const ContextItem: EnumVariantComponent<Item, "Context"> = ({
    data,
    onChange,
}) => {
    return (
        <Stack gap={0}>
            <DragHandle>
                <Box bg="gray.6" w="fit-content">
                    <Group w="auto" px="xs">
                        Context
                    </Group>
                </Box>
            </DragHandle>
            <Box
                bd="0.2em solid var(--mantine-color-gray-6)"
                style={{
                    borderRadius: "0.5em",
                    borderTopLeftRadius: "0px",
                }}
                w={data.size.w}
                h={data.size.h}
            >
                a
            </Box>
        </Stack>
    )
};
