import { DndContext, useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { Paper } from "@mantine/core";
import { useId } from "@mantine/hooks";
import { IconInfoCircle } from "@tabler/icons-react";
import { useContextMenu } from "mantine-contextmenu";
import { useContext } from "react";
import { NodeContext, OptionsContext } from "../../contexts";
import { actions } from "../../nodes";
import { match } from "../../utils";

import NumberNode from "./NumberNode";
import VariableNode from "./VariableNode";
import AdditionNode from "./AdditionNode";
import MultiplicationNode from "./MultiplicationNode";
import NegatedNode from './NegatedNode';

export const NodeComponent = ({ value, onChange }) => {
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
        Number: () => <NumberNode />,
        Variable: () => <VariableNode />,
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
