import { Box, Flex, Paper, Text } from "@mantine/core";
import { ItemComponent } from "../../../../types/app/item";
import { NodeComponent } from "../../../math/node/NodeComponent";
import { DragHandle } from "../../util/DragHandle";
import { IconGripVertical } from "@tabler/icons-react";
import { match } from "@alan404/enum";
import { MathStatement } from "@/types/model/statement";

export const StatementItem: ItemComponent<"Statement"> = ({ data, onChange, onFocus, onClose }) => {
    return (
        <Paper
            withBorder
            pos="relative"
            radius="md"
            style={{ backgroundClip: "padding-box", userSelect: "none" }}
            bg="dark"
        >
            <DragHandle onMouseDown={onFocus} onTouchStart={onFocus}>
                <Flex align="center">
                    <IconGripVertical height="100%" />
                    <Box bg="dark.7"
                        style={{ cursor: "auto", borderRadius: "0px var(--mantine-radius-md) var(--mantine-radius-md) 0px" }}
                        onMouseDown={(e) => {
                            e.stopPropagation();
                            onFocus?.();
                        }}
                        onTouchStart={(e) => {
                            e.stopPropagation();
                            onFocus?.();
                        }}
                    >
                        <Box p="xs">
                            {match(data.statement)({
                                Expression: (node) => (
                                    <NodeComponent node={node} setNode={(n) => onChange({
                                        ...data,
                                        statement: MathStatement.Expression(n),
                                    })} />
                                ),
                                _: () => <Text>meow</Text>,
                            }) as React.ReactNode}
                        </Box>
                    </Box>
                </Flex>
            </DragHandle>
        </Paper>
    )
}
