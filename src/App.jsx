import { ActionIcon, Box, Button, Card, Center, Checkbox, CloseButton, Combobox, Container, CopyButton, Flex, Grid, Group, InputBase, Paper, ScrollArea, Select, Stack, Text, TextInput, Textarea, useCombobox } from '@mantine/core'
import { useHover, useListState, useLogger, useMergedRef, useSetState } from '@mantine/hooks';
import React, { useContext, useEffect, useState } from 'react'
import { IconArrowRight, IconPlus } from '@tabler/icons-react';
import { modals } from '@mantine/modals';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { TouchBackend, TouchBackendImpl } from 'react-dnd-touch-backend';
import { HTML5Backend } from 'react-dnd-html5-backend';

const CreateNode = {
    variable: (data) => ({ type: NodeTypes.Variable, data }),
    number: (data) => ({ type: NodeTypes.Number, data }),
    add: (a, b) => ({ type: NodeTypes.Addition, data: [a, b] }),
}

const NodeTypes = {
    Variable: "variable",
    Number: "number",
    Addition: "addition",
};

const DraggableTypes = {
    Node: "node",
};

let Boxed = ({ children, type }) => {
    let [{ isDragging }, refDrag] = useDrag(() => ({
        type,
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        })
    }));

    const { hovered, ref: refHover } = useHover();

    const ref = useMergedRef(refDrag, refHover);

    return (
        <Paper
            withBorder
            p="sm"
            px="md"
            ref={ref}
            bg={hovered ? "dark.5" : "dark.6"}>
            {children}
        </Paper>
    )
};

const requiresParanthesis = (self, child) => {
    return true;
    if([NodeTypes.Addition].includes(child.type)) {
    }

    return false;
};

const StatementContext = React.createContext();

const StatementProvider = ({ stmt, onChange, children }) => {
    let add = (node) => {
        console.log(simplify(stmt.right));
        onChange({
            left: CreateNode.add(stmt.left, node),
            right: CreateNode.add(stmt.right, node),
        });
    };

    let simplify = (node) => {
        return ({
            [NodeTypes.Addition]: () => ({
                data: node.data.flatMap(n => (n.type == NodeTypes.Addition) ? (n.data) : n).map(simplify),
                ...node,
            }),
        }[node.type] || (() => node))() || node;
    }
    
    let simplifyAll = () => {
        onChange({
            left: simplify(stmt.left),
            right: simplify(stmt.right),
        })
    };

    let calculate = (node) => {
        return ({
            [NodeTypes.Addition]: () => ({
                data: node.data.reduce((acc, n, idx) =>
                    acc[acc.length-1]?.type == NodeTypes.Number && n.type == NodeTypes.Number
                    ? [...acc.slice(0, -1), {
                        data: Number(acc[acc.length-1]?.data) + Number(n.data),
                        ...n,
                    }] : [...acc, n], []),
                ...node,
            }),
        }[node.type] || (() => node))() || node;
    };

    let calculateLiterals = () => {
        onChange({
            left: calculate(stmt.left),
            right: calculate(stmt.right),
        })
    };

    return (
        <StatementContext.Provider value={{
            stmt,
            onChange,
            add,
            simplifyAll,
            calculateLiterals,
        }}>
            {children}
        </StatementContext.Provider>
    )
}

const Statement = ({ stmt, onChange }) => {
    console.log(stmt);

    return (
        <StatementProvider {...{
            stmt,
            onChange,
        }}>
            <Stack>
                <Group>
                    {Renderers.expr(stmt.left)}
                    <Text>=</Text>
                    {Renderers.expr(stmt.right)}
                </Group>
                <StatementControls />
            </Stack>
        </StatementProvider>
    )
};

const StatementControls = () => {
    let stmt = useContext(StatementContext);

    return (
        <Group justify='space-between'>
            {[
                { name: "calculate", run: () => stmt.calculateLiterals() },
                { name: "add 5", run: () => stmt.add(CreateNode.number(5)) },
                { name: "simplify", run: () => stmt.simplifyAll() },
            ].map((cmd, i) => <Button key={i} onClick={() => {cmd.run()}}>
                {cmd.name}
            </Button>)}
        </Group>
    );
};

let Render = (...n) => Renderers[n[0].type](...n);

let Renderers = {
    expr: (expr) => {
        let [{ isOver }, refDrop] = useDrop(() => ({
            accept: DraggableTypes.Node,
            drop: (item, monitor) => {

            },
            collect: (monitor) => ({
                isOver: !!monitor.isOver(),
            }),
        }), [expr]);

        return (
            <Paper
                ref={refDrop}
                withBorder={isOver}
                p={isOver ? "md" : "sm"}>
                {Render(expr)}
            </Paper>
        );
    },

    // node
    [NodeTypes.Variable]: ({ data }) => {
        return (
            <Boxed type={DraggableTypes.Node}>{data}</Boxed>
        )
    },

    [NodeTypes.Number]: ({ data }) => {
        return (
            <Boxed type={DraggableTypes.Node}>{data}</Boxed>
        )
    },

    [NodeTypes.Addition]: ({ data }) => {
        return (
            <Group>
                {data
                    .map((n, i) => (
                        <Box key={i*10}>{Render(n)}</Box>
                    ))
                    .reduce((acc, obj, idx) =>
                        [
                            ...(idx ? [...acc, <Text key={idx*10+1}>+</Text>] : [...acc]),
                            ...(requiresParanthesis(data, obj) ? [
                                <Text key={idx*10+2}>(</Text>,
                                obj,
                                <Text key={idx*10+3}>)</Text>,
                            ] : [obj])
                        ],
                        []
                    )}
            </Group>
        )
    },
}

const App = () => {
    let [statements, { setItem }] = useListState([
        { type: "eq", left: CreateNode.variable("x"), right: CreateNode.add(CreateNode.number(3), CreateNode.number(2)) }
    ])

    return (
        <Container h="100vh">
                <Center h="100vh">
                    {statements.map((stmt, i) => <Box key={i}>
                        <Statement
                            stmt={stmt}
                            onChange={(newdata) => {
                                setItem(i, newdata);
                            }}
                            />
                    </Box>)}
                </Center>
        </Container>
    )
}

export default App
