import { useContext } from "react";
import { NodeContext } from "../../contexts";
import { Group } from "@mantine/core";
import { Minus } from "../../glyphs";
import { NodeComponent } from "./Node";

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

export default NegatedNode;
