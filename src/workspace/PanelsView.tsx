import { useContext } from "react";
import { WorkspaceContext } from "./WorkspaceContext";
import { Box } from "@mantine/core";

export const PanelsView = () => {
    const { panels } = useContext(WorkspaceContext);
    
    const elements = panels.map(({ panel, position, size }) => (
        null
    ));

    return (
        <Box>

        </Box>
    )
};
