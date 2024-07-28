import { Box } from "@mantine/core"
import { Transform, TransformProvider } from "../../workspace/Transform";
import { useContext } from "react";
import { GlobalTransform } from "../../workspace/GlobalTransform";

export const BackgroundGrid = () => {
    const { position, scale } = useContext(GlobalTransform);

    let c = `var(--mantine-color-gray-9)`;
    let t = `1px`;
    let s = `${500 * scale}px`;
    let backgroundImage = `linear-gradient(to right, ${c} ${t}, transparent 1px), linear-gradient(to bottom, ${c} ${t}, transparent 1px)`;
    let backgroundPosition = `${position.x}px ${position.y}px`;

    return (
        <Box
            w="100%"
            h="100%"
            style={{
                position: "absolute",
                top: 0,
                left: 0,
                pointerEvents: "none",
                zIndex: -10,
            }}
        >
            <Box
                w="100%"
                h="100%"
                style={{
                    backgroundSize: [s, s].join(" "),
                    backgroundImage,
                    backgroundPosition,
                }}
            />
        </Box>
    )
}
