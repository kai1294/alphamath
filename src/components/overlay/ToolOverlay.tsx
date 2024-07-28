import { ActionIcon, Box, Center, FloatingIndicator, Group, Paper, SegmentedControl } from "@mantine/core";
import React, { useContext, useState } from "react";
import { ToolContext } from "../../workspace/ToolContext";
import { IconArrowsMove, IconPencil } from "@tabler/icons-react";
import { Tool } from "../../types/app/tools";

export const ToolOverlay = () => {
    const { tool, setTool } = useContext(ToolContext);

    const defaultData: { [P in Tool["type"]]: Extract<Tool, { type: P }>["data"] } = {
        pan: {},
        edit: {},
    };

    const iconProps = {
        width: "1.5em",
        height: "1.5em",
    };

    return (
        <Box style={{ position: "fixed", top: 0 }}>
            <Paper withBorder m="md" p="xs" className="ptr">
                <Group>
                    <SegmentedControl
                        data={[
                            { label: <Center><IconArrowsMove {...iconProps} /></Center>, value: "pan" },
                            { label: <Center><IconPencil {...iconProps} /></Center>, value: "edit" },
                        ]}
                        onChange={(v) => setTool({ type: v as Tool["type"], data: defaultData[v as Tool["type"]] })}
                        withItemsBorders={false}
                    />

                    meow :3
                </Group>
            </Paper>
        </Box>
    )
};
