import { ActionIcon, Box, Center, FloatingIndicator, Group, Paper, SegmentedControl, Tooltip } from "@mantine/core";
import React, { useContext, useState } from "react";
import { IconArrowsMove, IconPencil } from "@tabler/icons-react";
import { Tool } from "../../types/app/tools";
import { ToolContext } from "../workspace/ToolContext";
import { useHotkeys } from "@mantine/hooks";
import { CreateItemMenu } from "./CreateItemMenu";

export const ToolOverlay = () => {
    const { tool, setTool } = useContext(ToolContext);

    const pickTool = (type: Tool["type"]) =>
        setTool(Tool[type](defaultData[type]));

    const defaultData: { [P in Tool["type"]]: Extract<Tool, { type: P }>["data"] } = {
        Pan: {},
        Edit: {},
    };
    
    const iconProps = {
        width: "1.5em",
        height: "1.5em",
    };

    const toolIcons: Record<Tool["type"], React.ReactNode> = {
        Pan: <IconArrowsMove {...iconProps} />,
        Edit: <IconPencil {...iconProps} />,
    };

    const Hotbar: Tool["type"][] = [
        "Pan",
        "Edit",
    ];

    useHotkeys(Hotbar.map((type, idx) => (
        [(idx+1).toString(), () => pickTool(type)]
    )))

    return (
        <Box style={{ position: "fixed", top: 0 }}>
            <Paper withBorder m="md" p="xs" className="ptr">
                <Group gap="xs">
                    <CreateItemMenu />

                    <SegmentedControl
                        data={Hotbar.map((type) => ({
                            label: (
                                <Tooltip label={type}>
                                    <Center>
                                        {toolIcons[type]}
                                    </Center>
                                </Tooltip>
                            ),
                            value: type,
                        }))}
                        value={tool.type}
                        onChange={(v) => pickTool(v as Tool["type"])}
                        withItemsBorders={false}
                    />

                    meow :3
                </Group>
            </Paper>
        </Box>
    )
};
