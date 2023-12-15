import { Accordion, Box, Button, Center, Container, Group, JsonInput, Paper, Space, Stack, Text, Transition } from '@mantine/core'
import { useId, useSetState } from '@mantine/hooks';
import { useState } from 'react'
import { Nodes } from "./nodes";
import { OptionsContext } from './contexts';
import { NodeComponent } from './nodes/components/Node';
import { OptionsPanel } from './app/OptionsPanel';
import { MapInteractionCSS } from 'react-map-interaction';
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
            <DebugPanel
                value={node}
                onChange={setNode}
            />
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

const DebugPanel = ({ value, onChange }) => {
    return (
        <Paper withBorder p="md">
            <Group>
                <Text>Change state:</Text>
                <Button.Group>
                    {[{
                        name: "1+4+3",
                        state: Nodes.Addition([
                            Nodes.Number(1),
                            Nodes.Number(4),
                            Nodes.Number(3),
                        ]),
                    }, {
                        name: "2*3*200",
                        state: Nodes.Multiplication([
                            Nodes.Number(2),
                            Nodes.Number(3),
                            Nodes.Number(200),
                        ]),
                    }, {
                        name: "35+45",
                        state: Nodes.Addition([
                            Nodes.Number(35),
                            Nodes.Number(45),
                        ]),
                    }, {
                        name: "3*(5x-1)",
                        state: Nodes.Multiplication([
                            Nodes.Number(3),
                            Nodes.Addition([
                                Nodes.Multiplication([
                                    Nodes.Number(5),
                                    Nodes.Variable("x"),
                                ]),
                                Nodes.Negated(Nodes.Number(1))
                            ])
                        ])
                    }, {
                        name: "(10+5)/5",
                        state: Nodes.Division([
                            Nodes.Addition([
                                Nodes.Number(10),
                                Nodes.Number(5),
                            ]),
                            Nodes.Number(5),
                        ]),
                    }, {
                        name: "----1",
                        state: Nodes.Negated(Nodes.Negated(Nodes.Negated(Nodes.Negated(Nodes.Number(1))))),
                    }].map((p, i) => (
                        <Button key={i} variant="default" onClick={() => onChange(p.state)}>
                            {p.name}
                        </Button>
                    ))}
                </Button.Group>
            </Group>
            <Accordion>
                <Accordion.Item value="debug">
                    <Accordion.Control>Debug</Accordion.Control>
                    <Accordion.Panel>
                        <JsonInput
                            label="State"
                            autosize
                            formatOnBlur
                            value={JSON.stringify(value)}
                            onChange={(v) => {
                                try {
                                    let value = JSON.parse(v);
                                    onChange(value);
                                } catch (e) {
                                    //noop
                                }
                            }}
                        />
                    </Accordion.Panel>
                </Accordion.Item>
            </Accordion>
        </Paper>
    );
};

export default App
