import { ActionIcon, Box, Center, FloatingIndicator, Group, Kbd, Paper, SegmentedControl, Text, Tooltip } from "@mantine/core";
import React, { useContext, useState } from "react";
import { IconArrowsMove, IconClick, IconPencil, TablerIconsProps } from "@tabler/icons-react";
import { Tool } from "../../../../types/app/tools";
import { ToolContext } from "../../ToolContext";
import { useHotkeys } from "@mantine/hooks";
import { CreateItemMenu } from "./CreateItemMenu";

export const ToolOverlay = () => {
    const { tool, setTool } = useContext(ToolContext);

    const pickTool = (type: Tool["type"]) =>
        setTool({ type, data: defaultData[type] } as Tool);

    const defaultData: { [P in Tool["type"]]: Extract<Tool, { type: P }>["data"] } = {
        Pan: {},
        Select: { selectedIds: [] },
        Edit: {},
    };
    
    const iconProps = {
        width: "1.5em",
        height: "1.5em",
    };

    const toolIcons: Record<Tool["type"], React.ComponentType<TablerIconsProps>> = {
        Pan: IconArrowsMove,
        Edit: IconPencil,
        Select: IconClick,
    };

    const Hotbar: Tool["type"][] = [
        "Pan",
        "Select",
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
                        data={Hotbar.map((type, i) => {
                            let Icon = toolIcons[type];

                            return ({
                                label: (
                                    <Tooltip label={(
                                        <Group gap="xs">
                                            <Text>{type}</Text>
                                            <Kbd>{i+1}</Kbd>
                                        </Group>
                                    )}>
                                        <Center>
                                            <Icon {...iconProps} />
                                        </Center>
                                    </Tooltip>
                                ),
                                value: type,
                            });
                        })}
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
