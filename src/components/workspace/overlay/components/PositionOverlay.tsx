import { useContext } from "react"
import { Box, Button, Group, Text } from "@mantine/core";
import { useMousePosition } from "../../../../hooks/useMousePosition";
import { GlobalTransform } from "../../core/GlobalTransform";

export const PositionOverlay = () => {
    const { position, scale, reset } = useContext(GlobalTransform);
    const mouse = useMousePosition();

    return (
        <Box w="100%" style={{ position: "fixed", bottom: 0 }}>
            <Group justify="center" pb="xs">
                <Text c="dimmed" ta="center" fz="sm">
                    Workspace: ({position.x}, {position.y}) {scale.toString().slice(0, 3)}x
                    <br />
                    Mouse: ({mouse.x}, {mouse.y})
                </Text>
            </Group>
        </Box>
    )
}
