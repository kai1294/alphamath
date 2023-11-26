import { Box, Center, Container, Paper, Transition } from '@mantine/core'
import { useId, useSetState } from '@mantine/hooks';
import { useState } from 'react'
import { Nodes } from "./nodes";
import { useDroppable } from '@dnd-kit/core';
import { OptionsContext } from './contexts';
import { NodeComponent } from './nodes/components/Node';
import { OptionsPanel } from './app/OptionsPanel';

const App = () => {
    let [options, setOptions] = useSetState({
        paperBorder: false,
        hidePlusIfNegated: false,
    });

    let [node, setNode] = useState(Nodes.Addition([
        Nodes.Variable("x"),
        Nodes.Number(1),
        Nodes.Negated(Nodes.Number(2)),
        Nodes.Number(4),
        Nodes.Addition([
            Nodes.Number(1),
            Nodes.Number(1),
        ]),
        Nodes.Number(9),
    ]));

    return (
        <Container h="100vh" w="100vh" fluid>
            <OptionsContext.Provider value={[options, setOptions]}>
                <Center w="100vh" h="100%">
                    <NodeComponent
                        value={node}
                        onChange={setNode}
                    />
                </Center>
                <OptionsPanel />
            </OptionsContext.Provider>
        </Container>
    )
}

export default App
