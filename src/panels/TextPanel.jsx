import { useContext } from "react";
import { TransformProvider } from "./core/Transform";
import { Paper } from "@mantine/core";
import { Panel } from "./core/Panel";

export const TextPanel = () => {
    return (
        <Panel title="Test">
            Hello World!
        </Panel>
    );
};
