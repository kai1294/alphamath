import { WorkspaceView } from "./components/workspace/WorkspaceView";
import { MainOverlay } from "./components/overlay/MainOverlay";
import { BackgroundGrid } from "./components/detail/BackgroundGrid";
import { ToolProvider } from "./components/workspace/ToolContext";
import { GlobalTransformProvider } from "./components/workspace/GlobalTransform";
import { WorkspaceContext, WorkspaceProvider } from "./components/workspace/WorkspaceContext";
import { useContext } from "react";
import { ItemRenderer } from "./components/items/ItemRenderer";
import { TransformProvider } from "./components/workspace/Transform";
import { IconCrosshair } from "@tabler/icons-react";

const RootItemRenderer = () => {
    const { items, setItems } = useContext(WorkspaceContext);

    return (
        items.map((item, i) => (
            <ItemRenderer
                key={item.id}
                item={item}
                setItem={(data) => setItems(items.map((x, ii) => i == ii ? data : x))}
                onFocus={() => setItems([...(items.filter((_, ii) => ii !== i)), item])}
                onClose={() => setItems([...(items.filter((_, ii) => ii !== i))])}
            />
        ))
    )
}

const App = () => {
    return (
        <GlobalTransformProvider>
            <WorkspaceProvider>
                <ToolProvider>
                    <WorkspaceView>
                        <TransformProvider defaultValue={{ x: -25, y: -25 }}>
                            <IconCrosshair size={50} />
                        </TransformProvider>

                        <RootItemRenderer />
                    </WorkspaceView>
                    <BackgroundGrid />
                    <MainOverlay />
                </ToolProvider>
            </WorkspaceProvider>
        </GlobalTransformProvider>
    );
}

export default App
