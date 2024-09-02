import { ErrorCard } from "@/components/debug/ErrorCard";
import { NodeComponent } from "@/components/math/node/NodeComponent";
import { parseRPN } from "@/utils/serde/rpn/rpn";
import { Box, noop, Stack, TextInput } from "@mantine/core"
import { useState } from "react"

export const CommandBar = () => {
    const [value, setValue] = useState("");

    let preview;
    if(value) {
        try {
            let node = parseRPN(value);
    
            preview = (
                <NodeComponent
                    node={node}
                    setNode={noop}
                />
            )
        } catch(e) {
            preview = (
                <ErrorCard
                    error={e as Error}
                />
            )
        }
    }

    return (
        <Box style={{ position: "fixed", bottom: "10%" }} w="100%" px="xl">
            <Stack align="center">
                {preview}

                <TextInput
                    w="50%"
                    className="ptr"
                    value={value}
                    onChange={(e) => setValue(e.currentTarget.value)}
                />
            </Stack>
        </Box>
    )
}
