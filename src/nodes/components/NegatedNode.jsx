import { useContext } from "react";
import { NodeContext } from "../../contexts";
import { Group } from "@mantine/core";
import { Minus } from "../../glyphs";
import { NodeComponent } from "./Node";
import { DndContext } from "@dnd-kit/core";

const NegatedNode = () => {
    let { value, setValue } = useContext(NodeContext);

    return (
        <Group wrap="nowrap">
            <Minus />
            <DndContext>
                <NodeComponent
                    value={value.data}
                    onChange={(v) => setValue({
                        ...value,
                        data: v,
                    })}
                />
            </DndContext>
        </Group>
    );
}

export default NegatedNode;
