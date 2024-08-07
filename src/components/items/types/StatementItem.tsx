import { Box, Flex, Group, Paper, Stack, Text } from "@mantine/core";
import { ItemComponent } from "../../../types/app/item";
import { PanelWindow } from "../../panels/PanelWindow";
import { useContext } from "react";
import { WorkspaceContext } from "../../workspace/WorkspaceContext";
import { match } from "../../../types/utils";
import { NodeComponent } from "../../math/node/NodeComponent";
import { DragHandle } from "../../workspace/DragHandle";
import { IconGripVertical } from "@tabler/icons-react";

export const StatementItem: ItemComponent<"Statement"> = ({ data, onChange, onFocus }) => {
    return (
        <Paper withBorder pos="relative" radius="md" style={{ overflow: "clip" }}>
            <DragHandle>
                <Flex align="center" bg="dark" style={{ flex: "1 1 100%" }}>
                    <IconGripVertical height="100%" />
                    <Box bg="dark.7"
                        style={{ cursor: "auto" }}
                        onMouseDown={e => e.stopPropagation()}
                        onTouchStart={e => e.stopPropagation()}
                    >
                        <Box p="xs">
                            {match(data.statement)({
                                Expression: (node) => (
                                    <NodeComponent node={node} setNode={(n) => onChange({
                                        ...data,
                                        statement: {
                                            type: "Expression",
                                            data: n,
                                        }
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
