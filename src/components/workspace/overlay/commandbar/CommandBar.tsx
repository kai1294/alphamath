import { dispatcher } from "@/components/api/commands/dispatcher";
import { ErrorCard } from "@/components/debug/ErrorCard";
import { NodeComponent } from "@/components/math/node/NodeComponent";
import { parseRPN } from "@/utils/serde/rpn/rpn";
import { Box, Combobox, noop, Stack, TextInput, useCombobox } from "@mantine/core"
import { Suggestions } from "brigadier-ts";
import { useEffect, useState } from "react"

export const CommandBarOverlay = () => {
    return (
        <Box style={{ position: "fixed", bottom: "10%" }} w="100%" px="xl">
            <Stack align="center">
                {/* <CommandBar /> */}
            </Stack>
        </Box>
    )
}

export const CommandBar = () => {
    const [value, setValue] = useState("");
    const [cursor, _setCursor] = useState<number | null>(0);

    const [suggestions, setSuggestions] = useState<Suggestions | null>(null);

    useEffect(() => {
        (async () => {
            let ctx = {};
            let parsed = dispatcher.parse(value, ctx);
            setSuggestions(await dispatcher.getCompletionSuggestions(parsed, cursor || value.length));
        })()
    }, [value, cursor]);

    console.log(suggestions?.getList() || [])

    const options = (suggestions?.getList() || []).map((s, i) => (
        <Combobox.Option value={s.apply(value) + " "} key={i}>
            {s.apply(value)}
        </Combobox.Option>
    ));

    const combobox = useCombobox({});

    return (
        <Combobox
            store={combobox}
            position="top"
            onOptionSubmit={(v) => {
                setValue(v);
            }}
        >
            <Combobox.Dropdown>
                <Combobox.Options bg="dark">
                    {options}
                </Combobox.Options>
            </Combobox.Dropdown>

            <Combobox.Target>
                <TextInput
                    w="50%"
                    className="ptr"
                    value={value}
                    onFocus={() => combobox.openDropdown()}
                    onChange={(e) => {
                        setValue(e.currentTarget.value);
                        _setCursor(e.currentTarget.selectionEnd);
                    }}
                    onKeyUp={(e) => _setCursor(e.currentTarget.selectionEnd)}
                />
            </Combobox.Target>
        </Combobox>
    )
}
