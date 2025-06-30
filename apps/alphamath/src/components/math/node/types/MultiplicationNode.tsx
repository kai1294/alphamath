import { MathNode } from "@/types/model/node";
import { EnumVariantComponent } from "@/types/utils";
import { Box, Group, Text } from "@mantine/core";
import { NodeComponent, SortableNodeComponent } from "../NodeComponent";
import { SortableContext } from "@dnd-kit/sortable"

export const MultiplicationNode: EnumVariantComponent<MathNode, "Multiplication"> = ({ data, onChange }) => {
    let list = [];

    let first = true;
    for(let [i, node] of Object.entries(data)) {
        if(i != "0") list.push((
            <Text>.</Text>
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
            <SortableContext items={data.map(x => x.id)}>
                {list.map((x, i) => <Box key={i}>{x}</Box>)}
            </SortableContext>
        </Group>
    )
};
