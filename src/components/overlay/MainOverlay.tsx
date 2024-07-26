import { useContext } from "react"
import { GlobalTransform } from "../../workspace/GlobalTransform"
import { Box } from "@mantine/core";

export const MainOverlay = () => {
    const { x, y, scale } = useContext(GlobalTransform);
    
    return (
        <Box style={{ position: "fixed", top: 0, left: 0 }}>
            meow
        </Box>
    )
}
