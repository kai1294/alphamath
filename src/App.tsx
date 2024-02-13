import { Accordion, Box, Button, Center, Container, Group, JsonInput, Paper, Space, Stack, Text, Transition } from '@mantine/core'
import { useId, useSetState } from '@mantine/hooks';
import { useState } from 'react'
import { Nodes } from "./nodes";
import { OptionsContext } from './contexts';
import { NodeComponent } from './nodes/components/Node';
import { OptionsPanel } from './app/OptionsPanel';
import { GlobalTransformProvider } from './panels/core/GlobalTransform';

const WorkspaceView = () => {

    return (
        <GlobalTransformProvider>
            <WorkspaceCanvas />
        </GlobalTransformProvider>
    )
}

const WorkspaceCanvas = () => {
    let [node, setNode] = useState(Nodes.Addition([
        Nodes.Number(1),
        Nodes.Number(4),
        Nodes.Number(3),
    ]));

    return (
        <Stack style={{ textAlign: "center" }}>
            <Space h="xl" />
            <Group justify='center'>
                <NodeComponent
                    value={node}
                    onChange={setNode}
                />
            </Group>
            <Space h="xl" />
        </Stack>
    );
}

const App = () => {
    let [options, setOptions] = useSetState({
        paperBorder: true,
        hidePlusIfNegated: false,
    });

    return (
        <OptionsContext.Provider value={[options, setOptions]}>
            <Box w="100%" h="100%">
                <WorkspaceView />
            </Box>
            <OptionsPanel />
        </OptionsContext.Provider>
    )
}

export default App
