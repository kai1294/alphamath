import { useContext } from "react"
import { GlobalTransform } from "../../workspace/GlobalTransform"
import { Box, Button, Group, Text } from "@mantine/core";
import { useMouse } from "@mantine/hooks";

export const MainOverlay = () => {
    const { position, scale, setPosition } = useContext(GlobalTransform);
    const mouse = useMouse();

    const mousePosition = {
        x: Math.round((mouse.x - position.x) / scale),
        y: Math.round((mouse.y - position.y) / scale),
    };
    
    return (
        <Box style={{ position: "fixed", top: 0, left: 0, pointerEvents: "none" }}>
            <Box w="100%" style={{ position: "fixed", bottom: 0 }}>
                <Group justify="center" pb="md">
                    <Text c="dimmed" ta="center">
                        Workspace: ({position.x}, {position.y}) {scale}x
                        <br />
                        Mouse: ({mousePosition.x}, {mousePosition.y})
                    </Text>
                    <Button
                        style={{ pointerEvents: "all" }}
                        variant="light"
                        onClick={() => setPosition({ x: window.innerWidth/2, y: window.innerHeight/2 })}
                    >
                        Center
                    </Button>
                </Group>
            </Box>
        </Box>
    )
}
