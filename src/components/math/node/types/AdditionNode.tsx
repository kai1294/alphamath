import { MathNode } from "@/types/model/node";
import { EnumVariantComponent } from "@/types/utils";
import { Box, Group, Text } from "@mantine/core";
import { NodeComponent } from "../NodeComponent";

export const AdditionNode: EnumVariantComponent<MathNode, "Addition"> = ({ data, onChange }) => {
    let list = [];

    let first = true;
    for(let [i, node] of Object.entries(data)) {
        if(i != "0") list.push((
            <Text>+</Text>
        ));

        list.push((
            <NodeComponent
                node={node}
                setNode={(n) => onChange(data.map((v, ii) => Number(i) == ii ? n : v))}
            />
        ));
    }

    return (
        <Group wrap="nowrap">
            {list.map((x, i) => <Box key={i}>{x}</Box>)}
        </Group>
    )
};
