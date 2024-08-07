import { Paper, Text } from "@mantine/core";
import { MathNode } from "../../../types/model/node";
import { match, WithSetters } from "../../../types/utils";

export const NodeComponent = ({
    node,
    setNode,
}: WithSetters<{ node: MathNode }>) => {
    return (
        <Paper withBorder shadow="md" px="sm" py="xs" radius="md">
            {match(node)({
                Number: (n) => <Text>{n.toString()}</Text>,
                Variable: (v) => <Text>{v}</Text>,
                _: () => <Text>todo</Text>,
            }) as React.ReactNode}
        </Paper>
    )
};
