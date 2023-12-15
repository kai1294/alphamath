import { useContext } from "react";
import { TransformProvider } from "./core/Transform";
import { Paper } from "@mantine/core";

export const DebugPanel = () => {
    return (
        <TransformProvider>
            <Paper withBorder>
                Hello World!
            </Paper>
        </TransformProvider>
    );
};
