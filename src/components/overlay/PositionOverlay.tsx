import { useContext } from "react"
import { Box, Button, Group, Text } from "@mantine/core";
import { useMousePosition } from "../../hooks/useMousePosition";
import { GlobalTransform } from "../workspace/GlobalTransform";

export const PositionOverlay = () => {
    const { position, scale, reset } = useContext(GlobalTransform);
    const mouse = useMousePosition();

    return (
        <Box w="100%" style={{ position: "fixed", bottom: 0 }}>
            <Group justify="center" pb="md">
                <Text c="dimmed" ta="center">
                    Workspace: ({position.x}, {position.y}) {scale.toString().slice(0, 3)}x
                    <br />
                    Mouse: ({mouse.x}, {mouse.y})
                </Text>
                <Button
                    className="ptr"
                    variant="light"
                    onClick={reset}
                >
                    Center
                </Button>
            </Group>
        </Box>
    )
}
