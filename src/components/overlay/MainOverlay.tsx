import { useContext } from "react"
import { GlobalTransform } from "../../workspace/GlobalTransform"
import { Box, Button, Group, Text } from "@mantine/core";
import { useMouse } from "@mantine/hooks";
import { useMousePosition } from "../../hooks/useMousePosition";

export const MainOverlay = () => {
    const { position, scale, setPosition, setScale } = useContext(GlobalTransform);
    const mouse = useMousePosition();
    
    return (
        <Box style={{ position: "fixed", top: 0, left: 0, pointerEvents: "none" }}>
            <Box w="100%" style={{ position: "fixed", bottom: 0 }}>
                <Group justify="center" pb="md">
                    <Text c="dimmed" ta="center">
                        Workspace: ({position.x}, {position.y}) {scale.toString().slice(0, 3)}x
                        <br />
                        Mouse: ({mouse.x}, {mouse.y})
                    </Text>
                    <Button
                        style={{ pointerEvents: "all" }}
                        variant="light"
                        onClick={() => {
                            setPosition({ x: window.innerWidth/2, y: window.innerHeight/2 });
                            setScale(1);
                        }}
                    >
                        Center
                    </Button>
                </Group>
            </Box>
        </Box>
    )
}
