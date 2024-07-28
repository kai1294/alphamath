import { IconCrosshair } from "@tabler/icons-react";
import { TransformProvider } from "./workspace/Transform";
import { WorkspaceView } from "./workspace/WorkspaceView";
import { Panel } from "./workspace/Panel";
import { MainOverlay } from "./components/overlay/MainOverlay";
import { GlobalTransformProvider } from "./workspace/GlobalTransform";
import { Textarea, TextInput } from "@mantine/core";
import { BackgroundGrid } from "./components/detail/BackgroundGrid";

const App = () => {
    return (
        <GlobalTransformProvider>
            <WorkspaceView>
                <TransformProvider defaultValue={{ x: -25, y: -25 }}>
                    <IconCrosshair size={50} />
                </TransformProvider>

                <Panel>
                    hello world

                    (resize me using lower right corner)
                </Panel>

                <Panel autoSize>
                    <Textarea autosize />
                </Panel>

                

            </WorkspaceView>
            
            <BackgroundGrid />

            <MainOverlay />
        </GlobalTransformProvider>
    );
}

export default App
