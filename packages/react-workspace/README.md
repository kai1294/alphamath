# @alan404/react-workspace

Infinitely pannable, accessible map-like workspace for React

Created for the alphamath project but used for other things too, like [deniz's polycules](https://github.com/TheAlan404/polycules)

## Installation

```
pnpm add @alan404/react-workspace

# recommended:
pnpm add @alan404/vec2
```

## Features

- Infinite scroll/pan
- Mobile touch events support
- Zooming
- Uncontrolled and controlled state (`GlobalTransform` and `Transform`)
  - `TransformProvider` can have controlled or uncontrolled position
  - Elements inside `TransformProvider` can use `useTransform()` to change position
- Highly customizable
- Providers have div props

## Usage

```tsx
const App = () => {
    // Wrap your workspace in a GlobalTransform
    // You can wrap it at the root of your app
    // so you can add other UI to change global
    // transform.

    return (
        // All of these props are OPTIONAL
        <GlobalTransformProvider
            // Global transform can either be controlled
            // by react-workspaces or manually:
            position={vec2(200, 200)}
            setPosition={cb}
            scale={1}
            setScale={cb}

            // Provide defaults:
            initialPosition={vec2()}
            initialScale={1}
            minScale={0.1}
            maxScale={3}
        >
            <Example />
        </GlobalTransformProvider>
    )
};

const Example = () => {
    const [pos, setPos] = useState<Vec2>(vec2());

    return (
        // Workspace is a combination of
        // - BackgroundGrid
        // - WorkspaceView with usePanning and useScaling
        <Workspace>
            <TransformProvider
                // Children can move
                // State controlled by react-workspace
                initialPosition={{ x: 25, y: 25 }}
            >
                <MyComponent />
            </TransformProvider>

            <TransformProvider
                // Children can still move
                // State controlled by this component
                position={pos}
                setPosition={setPos}
            />

            <TransformProvider
                // Children can't move
                // unless `pos` changes
                position={pos}
            />
        </Workspace>
    )
}

const MyComponent = () => {
    // Children can position themselves
    const { position, setPosition } = useTransform();

    return (
        <div className="card">
            {/*
                DragHandle component allows child to be dragged to position them
                It uses useRelativeDrag internally
            */}
            <DragHandle>
                <IconDrag />
            </DragHandle>

            Drag me!
        </div>
    )
}

const Customization = () => {
    // If you dont like the <Workspace> component,
    // you can use react-workspace to make your own:

    const ref = useRef();

    // provides panning actions (mouse/touch drag)
    const isDragging = usePanning(ref);

    // provides scaling actions (mouse wheel and two finger pinch)
    useScaling(ref);
    
    return (
        // WorkspaceView uses GlobalTransform to move contents accordingly
        <WorkspaceView ref={ref}>
            <div id="content" />
        </WorkspaceView>
    )
};

const MouseHook = () => {
    // The coordinates are relative to GlobalTransform
    const mouse = useMousePosition();

    return (
        <div>
            Mouse Position: {mouse.x}, {mouse.y}
        </div>
    )
};
```
