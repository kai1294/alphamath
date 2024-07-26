import { ActionIcon, Box, Button, Stack } from "@mantine/core";
import { useContext, useRef, useState } from "react";
import { Transform, TransformProvider } from "./Transform";
import { Icon12Hours, IconMenu2 } from "@tabler/icons-react";
import { GlobalTransform } from "./GlobalTransform";
import { useHandle } from "./useHandle";
import { Panel } from "./Panel";

export const WorkspaceView = () => {
    const [scale, setScale] = useState(1);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const workspaceRef = useRef(null);
    const [isPanning, setIsPanning] = useState(false);
    const [startPanPosition, setStartPanPosition] = useState({ x: 0, y: 0 });
    const [mouseStart, setMouseStart] = useState({ x: 0, y: 0 });

    const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
        e.preventDefault();
        const delta = e.deltaY;
        const newScale = scale - delta / 500;
        setScale(Math.max(0.1, newScale)); // Limit the zoom out level
    };

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        setIsPanning(true);
        setMouseStart({ x: e.clientX, y: e.clientY });
        setStartPanPosition({ ...position });
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isPanning) return;
        const dx = e.clientX - mouseStart.x;
        const dy = e.clientY - mouseStart.y;
        setPosition({
            x: startPanPosition.x + dx,
            y: startPanPosition.y + dy,
        });
    };

    const handleMouseUp = () => {
        setIsPanning(false);
    };

    return (
        <GlobalTransform.Provider value={{ ...position, scale }}>
            <Box
                onWheel={handleWheel}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                w="100vw"
                h="100vh"
                style={{
                    overflow: "hidden",
                    position: 'relative',
                    cursor: isPanning ? "grabbing" : "grab",
                }}>
                <Box
                    ref={workspaceRef}
                    style={{
                        transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                        transformOrigin: '0 0',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                    }}
                >
                    <TransformProvider initial={{ x: 0, y: 20 }}>
                        <Icon12Hours />
                    </TransformProvider>

                    <TransformProvider>
                        <Stack>
                        <Button variant="light">
                            Spawn
                        </Button>
                        <Button variant="light">
                            Spawn
                        </Button>
                        <Button variant="light">
                            Spawn
                        </Button>
                        <Button variant="light">
                            Spawn
                        </Button>
                        <Button variant="light">
                            Spawn
                        </Button>
                        </Stack>
                    </TransformProvider>
                    
                    <Panel>
                        <PanelTest />
                    </Panel>
                </Box>
            </Box>
        </GlobalTransform.Provider>
    )
}

const PanelTest = () => {
    const { x, y } = useContext(Transform);
    
    return (
        <Box
            bg="dark.1"
        >
            {x}, {y}
        </Box>
    )
}
