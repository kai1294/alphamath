import { Affix, Checkbox, Paper, Stack } from '@mantine/core';
import { useContext } from 'react';
import { match } from '../utils';
import { OptionsContext } from '../contexts';
import { useHotkeys } from '@mantine/hooks';

export const OptionsPanel = () => {
    let [options, setOptions] = useContext(OptionsContext);

    let elements = [
        {
            type: "bool",
            id: "paperBorder",
            label: "Paper Border",
        },
        {
            type: "bool",
            id: "hidePlusIfNegated",
            label: "Hide + if subtraction",
        },
        {
            type: "bool",
            id: "paintContainersDark",
            label: "Paint containers dark when dragging",
        },
    ].filter(x=>x).map((opt, i) => {
        return match(opt.type)({
            bool: () => <Checkbox
                key={i}
                checked={options[opt.id]}
                label={opt.label}
                onChange={(e) => setOptions({ [opt.id]: e.currentTarget.checked })} />,
        });
    });

    useHotkeys([
        ["b", () => setOptions(({ paperBorder }) => ({ paperBorder: !paperBorder }))]
    ])

    return (
        <Affix position={{ bottom: "1em", right: "1em" }}>
            <Paper withBorder p="md">
                <Stack gap="md">
                    {elements}
                </Stack>
            </Paper>
        </Affix>
    );
};
