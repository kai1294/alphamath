import { useContext } from "react";
import { NodeContext } from "../../contexts";
import { Group, Stack } from "@mantine/core";
import { DivisionLine, Minus } from "../../glyphs";
import { NodeComponent } from "./Node";
import { DndContext } from "@dnd-kit/core";

const DivisionNode = () => {
    let { value, setValue } = useContext(NodeContext);

    return (
        <Stack>
            <NodeComponent
                value={value.data[0]}
                onChange={(v) => setValue({
                    ...value,
                    data: [v, value.data[1]],
                })}
            />
            <DivisionLine />
            <NodeComponent
                value={value.data[1]}
                onChange={(v) => setValue({
                    ...value,
                    data: [value.data[0], v],
                })}
            />
        </Stack>
    );
}

export default DivisionNode;
