import { DndContext, useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { Paper } from "@mantine/core";
import { useId } from "@mantine/hooks";
import { IconInfoCircle } from "@tabler/icons-react";
import { useContextMenu } from "mantine-contextmenu";
import { useContext } from "react";
import { NodeContext, OptionsContext } from "../../contexts";
import { actions } from "..";
import { isPrime, match } from "../../../utils";

import NumberNode from "./NumberNode";
import VariableNode from "./VariableNode";
import AdditionNode from "./AdditionNode";
import MultiplicationNode from "./MultiplicationNode";
import NegatedNode from './NegatedNode';
import { useSortable } from "@dnd-kit/sortable";
import DivisionNode from "./DivisionNode";
import { MathNode } from "../../../types";

export const NodeComponent = ({ value, onChange }: {
    value: MathNode,
    onChange: (n: MathNode) => void,
}) => {
    let { showContextMenu } = useContextMenu();
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: value.uuid,
    });
    const style = {
        //transform: CSS.Translate.toString(transform),
        transition,
        userSelect: "none",
        touchAction: "manipulation",
        opacity: isDragging ? 0.1 : 1,
    };

    let executeAction = (id: string) => {
        let action = actions.find(a => a.id == id)!;
        let newValue = action.apply(value);
        onChange(newValue);
    };

    return (
        <NodeContext.Provider value={{
            executeAction,
            value,
            setValue: onChange,
        }}>
            <NodeComponentRenderer
                paperStyle={style}
                paperProps={{
                    ...attributes,
                    ...listeners,
                    ref: setNodeRef,
                    onContextMenu: showContextMenu([
                        {
                            key: "info",
                            title: `Node::${value.type}`,
                            icon: <IconInfoCircle size={16} />,
                            disabled: true,
                            onClick: () => { },
                        },
                        ...((value.type == "Number" && isPrime(value.data)) ? [
                            {
                                key: "info-prime",
                                title: `${value.data} is a prime number`,
                                onClick: ()=>{},
                                disabled: true,
                            }
                        ] : []),
                        {
                            key: "divider",
                        },
                        ...actions.filter(a => a.filter ? a.filter(value) : true).map(a => ({
                            key: a.id,
                            icon: a.icon,
                            title: a.name,
                            onClick: () => executeAction(a.id),
                        })),
                    ]),
                }}
                />
        </NodeContext.Provider>
    );
};

export const NodeComponentRenderer = ({ paperProps = {}, paperStyle = {} }) => {
    const { value } = useContext(NodeContext);
    let [{ paperBorder }] = useContext(OptionsContext);

    let el = match(value.type)({
        Number: () => <NumberNode />,
        Variable: () => <VariableNode />,
        Addition: () => <AdditionNode />,
        Negated: () => <NegatedNode />,
        Multiplication: () => <MultiplicationNode />,
        Division: () => <DivisionNode />,
    });

    return (
        <Paper
            p="xs"
            bg="transparent"
            withBorder={paperBorder}
            {...paperProps}
            style={{
                ...paperStyle,
            }}>
            {el}
        </Paper>
    );
}
