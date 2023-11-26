import { ActionIcon, Affix, Box, Button, Card, Center, Checkbox, CloseButton, Combobox, Container, CopyButton, Flex, Grid, Group, InputBase, Paper, ScrollArea, Select, Stack, Text, TextInput, Textarea, Transition, useCombobox } from '@mantine/core'
import { useHover, useId, useListState, useLogger, useMergedRef, useSetState } from '@mantine/hooks';
import React, { useContext, useEffect, useState } from 'react'
import { Nodes, actions } from "./nodes";
import { Dot, Minus, Plus, TextGlyph } from './glyphs';
import { match } from './utils';
import { useContextMenu } from 'mantine-contextmenu';
import { IconInfoCircle } from '@tabler/icons-react';
import { DndContext, useDndMonitor, useDraggable, useDroppable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

const OptionsContext = React.createContext();

const Gap = ({ visible }) => {
    return (
        <Transition
            mounted={visible}
            transition={{
                in: { width: "1em" },
                out: { width: "0" },
                transitionProperty: "width",
            }}>
            {(styles) => <Paper
                p="md"
                style={styles}
                />}
        </Transition>
    );
};

const DropArea = ({ index }) => {
    let id = useId();
    const { setNodeRef, isOver } = useDroppable({
        id,
    });
    
    return (
        <Box ref={setNodeRef}>

        </Box>
    );
};

const NodeContext = React.createContext();
const NodeComponent = ({ value, onChange }) => {
    let [{ paperBorder }] = useContext(OptionsContext);
    let { showContextMenu } = useContextMenu();
    let id = useId();
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id,
    });
    const style = {
        transform: CSS.Translate.toString(transform),
    };

    let executeAction = (id, args) => {
        let action = actions.find(a => a.id == id);
        let newValue = action.apply(value);
        onChange(newValue);
    };

    let el = match(value.type)({
        Number: () => <TextGlyph text={value.data} />,
        Variable: () => <TextGlyph text={value.data} />,
        Addition: () => <AdditionNode />,
        Negated: () => <NegatedNode />,
        Multiplication: () => <MultiplicationNode />,
    });

    return (
        <NodeContext.Provider value={{
            executeAction,
            value,
            setValue: onChange,
        }}>
            <Paper
                withBorder={paperBorder}
                p="xs"
                px="xs"
                onContextMenu={showContextMenu([
                    {
                        key: "info",
                        title: `Node::${value.type}`,
                        icon: <IconInfoCircle size={16} />,
                        disabled: true,
                        onClick: () => { },
                    },
                    {
                        key: "divider",
                    },
                    ...actions.map(a => ({
                        key: a.id,
                        icon: a.icon,
                        title: a.name,
                        onClick: () => executeAction(a.id),
                    })),
                ])}
                {...attributes}
                {...listeners}
                style={style}
                ref={setNodeRef}>
                <DndContext>
                    {el}
                </DndContext>
            </Paper>
        </NodeContext.Provider>
    );
};

const NegatedNode = () => {
    let { value, setValue } = useContext(NodeContext);

    return (
        <Group wrap="nowrap">
            <Minus />
            <NodeComponent
                value={value.data}
                onChange={(v) => setValue({
                    data: v,
                    ...value,
                })}
            />
        </Group>
    );
}

const MultiplicationNode = () => {
    let { value, setValue } = useContext(NodeContext);
    // Dnd kit stuff
    let id = useId();
    const { isOver, setNodeRef } = useDroppable({
        id,
        data: {
            value,
        },
    });

    // Node stuff
    let elements = [];

    let prev;
    for (let idx = 0; idx < value.data.length; idx++) {
        let node = value.data[idx];

        if (prev) {
            elements.push(<Dot />);
        }

        elements.push(<NodeComponent
            value={node}
            onChange={(v) => setValue({
                type: value.type,
                data: value.data.map((t, i) => i == idx ? v : t)
            })} />);

        prev = node;
    }

    return (
        <DndContext>
            <Group ref={setNodeRef} wrap="nowrap">{elements.map((el, i) => {
                el.key = i;
                return el;
            })}</Group>
        </DndContext>
    );
};

const AdditionNode = () => {
    let [{ hidePlusIfNegated }] = useContext(OptionsContext);
    let { value, setValue } = useContext(NodeContext);
    // Dnd kit stuff
    let id = useId();
    const { isOver, setNodeRef } = useDroppable({
        id,
        data: {
            value,
        },
    });

    // Node stuff
    let elements = [];

    let prev;
    for (let idx = 0; idx < value.data.length; idx++) {
        let node = value.data[idx];

        if (prev && (hidePlusIfNegated ? node.type != "Negated" : true)) {
            elements.push(<Plus />);
        }

        //elements.push(<Gap visible={isOver} />);

        elements.push(<NodeComponent
            value={node}
            onChange={(v) => setValue({
                type: value.type,
                data: value.data.map((t, i) => i == idx ? v : t)
            })} />);

        prev = node;
    }

    return (
        <Group ref={setNodeRef} wrap="nowrap" bg={isOver ? "dark" : ""}>
            {elements.map((el, i) => (<div key={i}>{el}</div>))}
        </Group>
    );
};

const App = () => {
    let [options, setOptions] = useSetState({
        paperBorder: false,
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

const OptionsPanel = () => {
    let [options, setOptions] = useContext(OptionsContext);

    let elements = [
        {
            type: "bool",
            id: "paperBorder",
            label: "Paper Border",
        },
        {
            type: "bool",
            id: "hidePlusIfNegated",
            label: "Hide + if subtraction",
        },
    ].map((opt, i) => {
        return match(opt.type)({
            bool: () => <Checkbox
                checked={options[opt.id]}
                label={opt.label}
                onChange={(e) => setOptions({ [opt.id]: e.currentTarget.checked })} />
        });
    });

    return (
        <Affix position={{ bottom: "1em", right: "1em" }}>
            <Paper withBorder p="md">
                <Stack gap="md">
                    {elements}
                </Stack>
            </Paper>
        </Affix>
    );
};

export default App
