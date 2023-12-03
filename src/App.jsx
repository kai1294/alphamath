import { Accordion, Box, Button, Center, Container, Group, JsonInput, Paper, Space, Stack, Text, Transition } from '@mantine/core'
import { useId, useSetState } from '@mantine/hooks';
import { useState } from 'react'
import { Nodes } from "./nodes";
import { useDroppable } from '@dnd-kit/core';
import { OptionsContext } from './contexts';
import { NodeComponent } from './nodes/components/Node';
import { OptionsPanel } from './app/OptionsPanel';

const App = () => {
    let [options, setOptions] = useSetState({
        paperBorder: true,
        hidePlusIfNegated: false,
    });

    let [node, setNode] = useState(Nodes.Addition([
        Nodes.Number(1),
        Nodes.Number(4),
        Nodes.Number(3),
    ]));

    return (
        <Container h="100vh" w="100vh" fluid>
            <OptionsContext.Provider value={[options, setOptions]}>
                <Center w="100vh" h="100%">

                    <Stack style={{ textAlign: "center" }}>
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

                </Center>
                <OptionsPanel />
            </OptionsContext.Provider>
        </Container>
    )
}

const DebugPanel = ({ value, onChange }) => {
    return (
        <Paper withBorder p="md" w="50vw">
            <Accordion>
                <Accordion.Item value="debug">
                    <Accordion.Control>Debug</Accordion.Control>
                    <Accordion.Panel>
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
                                }].map((p, i) => (
                                    <Button key={i} variant="default" onClick={() => onChange(p.state)}>
                                        {p.name}
                                    </Button>
                                ))}
                            </Button.Group>
                        </Group>

                        <JsonInput
                            label="State"
                            autosize
                            formatOnBlur
                            disabled
                            value={JSON.stringify(value, null, "\t")}
                        />
                    </Accordion.Panel>
                </Accordion.Item>
            </Accordion>
        </Paper>
    );
};

export default App
