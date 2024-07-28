import { IconCrosshair } from "@tabler/icons-react";
import { TransformProvider } from "./workspace/Transform";
import { WorkspaceView } from "./workspace/WorkspaceView";
import { Panel } from "./workspace/Panel";
import { MainOverlay } from "./components/overlay/MainOverlay";
import { GlobalTransformProvider } from "./workspace/GlobalTransform";
import { Textarea, TextInput } from "@mantine/core";
import { BackgroundGrid } from "./components/detail/BackgroundGrid";
import { ToolProvider } from "./workspace/ToolContext";

const App = () => {
    return (
        <GlobalTransformProvider>
            <ToolProvider>
                <WorkspaceView>
                    <TransformProvider defaultValue={{ x: -25, y: -25 }}>
                        <IconCrosshair size={50} />
                    </TransformProvider>
                </WorkspaceView>
                
                <BackgroundGrid />

                <MainOverlay />
            </ToolProvider>
        </GlobalTransformProvider>
    );
}

export default App
