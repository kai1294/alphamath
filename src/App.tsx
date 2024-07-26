import { IconCrosshair } from "@tabler/icons-react";
import { TransformProvider } from "./workspace/Transform";
import { WorkspaceView } from "./workspace/WorkspaceView";
import { Panel } from "./workspace/Panel";
import { MainOverlay } from "./components/overlay/MainOverlay";

const App = () => {
    return (
        <WorkspaceView>
            <TransformProvider initial={{ x: 0, y: 0 }}>
                <IconCrosshair />
            </TransformProvider>
            
            <Panel>
                hello world
            </Panel>

        </WorkspaceView>
    );
}

export default App
