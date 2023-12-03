import { useContext } from "react";
import { Transform, TransformProvider } from "./Transform";
import { Box, Card, Group, Text } from "@mantine/core";
import { IconGripVertical } from "@tabler/icons-react";
import { useDraggable } from "@dnd-kit/core";


export const Panel = (props) => {
    return (
        <TransformProvider>
            <PanelLayout {...props} />
        </TransformProvider>
    );
}

const PanelLayout = ({ id, title, children }) => {
    const { attributes, listeners, setNodeRef } = useDraggable({ id });

    return (
        <Card
            shadow="sm"
            padding="lg"
            radius="md"
            withBorder>
            <Group>
                <Box {...attributes}
                    {...listeners}
                    ref={setNodeRef}>
                    <IconGripVertical />
                </Box>
                <Text>{title}</Text>
            </Group>
            {children}
        </Card>
    )
}
