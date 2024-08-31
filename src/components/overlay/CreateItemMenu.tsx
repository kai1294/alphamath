import { ActionIcon, Group, Menu } from "@mantine/core"
import { useContext } from "react"
import { WorkspaceContext } from "../workspace/WorkspaceContext"
import { IconPlus } from "@tabler/icons-react";
import { createNew, Item } from "../../types/app/item";

export const CreateItemMenu = () => {
    const { items, setItems } = useContext(WorkspaceContext);

    const add = (ty: Item["type"]) => {
        setItems([...items, createNew[ty]!()]);
    };

    return (
        <Group>
            <Menu position="bottom-start" withArrow>
                <Menu.Target>
                    <ActionIcon
                        variant="light"
                        color="gray"
                    >
                        <IconPlus />
                    </ActionIcon>
                </Menu.Target>

                <Menu.Dropdown>
                    <Menu.Label>
                        Create new...
                    </Menu.Label>
                    <Menu.Item onClick={() => add("Note")}>
                        Note
                    </Menu.Item>
                    <Menu.Item onClick={() => add("Statement")}>
                        Statement
                    </Menu.Item>
                    <Menu.Item onClick={() => add("Debug")}>
                        Debug
                    </Menu.Item>
                </Menu.Dropdown>
            </Menu>
        </Group>
    )
}
