import { Box } from "@mantine/core"
import { useContext } from "react";
import { GlobalTransform } from "../workspace/core/GlobalTransform";

export const BackgroundGrid = () => {
    return (
        <Box
            w="100%"
            h="100%"
            style={{
                position: "fixed",
                pointerEvents: "none",
                zIndex: -10,
            }}
        >
            <Grid
                color="var(--mantine-color-gray-9)"
                distance={500}
                thickness={1}
            />
            <Grid
                color="var(--mantine-color-gray-8)"
                distance={1000}
                thickness={1}
            />
        </Box>
    )
}

const Grid = ({
    color,
    distance,
    thickness,
}: {
    color: string;
    distance: number;
    thickness: number;
}) => {
    const { position, scale } = useContext(GlobalTransform);
    
    let t = `${thickness}px`;
    let s = `${distance * scale}px`;
    let backgroundImage = `linear-gradient(to right, ${color} ${t}, transparent 1px), linear-gradient(to bottom, ${color} ${t}, transparent 1px)`;
    let backgroundPosition = `${position.x}px ${position.y}px`;

    return (
        <Box
            w="100%"
            h="100%"
            style={{
                backgroundSize: [s, s].join(" "),
                backgroundImage,
                backgroundPosition,
                position: "absolute",
            }}
        />
    )
}
