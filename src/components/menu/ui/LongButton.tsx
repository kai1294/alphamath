import { ActionIcon, ActionIconProps, Box, Button, ButtonProps, Center, MantineColor, parseThemeColor, PolymorphicComponentProps, RingProgress, Tooltip, TooltipProps, useMantineTheme } from "@mantine/core";
import { LongPressOptions, useLongPress } from "../../../hooks/useLongPress";
import React from "react";
import { useFadingState } from "../../../hooks/useFadingState";

export interface LongButtonOptions {
    onLongPress: () => void;
    tooltip?: React.ReactNode;
    tooltipProps?: PolymorphicComponentProps<"div", TooltipProps>;
    fillColor?: MantineColor;
};

export type LongButtonProps = LongButtonOptions
    & LongPressOptions
    & PolymorphicComponentProps<"button", ButtonProps>
    & React.PropsWithChildren;

export const LongButton = ({
    children,
    onLongPress,
    tooltip,
    tooltipProps,
    fillColor,
    variant,
    ...rest
}: LongButtonProps) => {
    const theme = useMantineTheme();
    const [show, setShow] = useFadingState(false, false, 1000);
    const { progress, props } = useLongPress(onLongPress, {
        ...rest,
        shortClickDuration: rest.shortClickDuration || 100,
        onShortClick() {
            rest.onShortClick?.();
            setShow(true);
        },
    });

    let { background: colorNormal } = theme.variantColorResolver({
        color: rest.color || theme.primaryColor,
        variant: variant || "filled",
        theme,
    });
    let { background: colorFill } = theme.variantColorResolver({
        color: fillColor || "green",
        variant: variant || "filled",
        theme,
    });

    return (
        <Tooltip
            label={tooltip || "Long press"}
            disabled={!show}
            opened
            withArrow
            {...tooltipProps}
        >
            <Button
                {...rest}
                {...props}
                variant={variant}
                style={{
                    background: `linear-gradient(90deg, ${colorFill} 0%, ${colorFill} ${progress * 100}%, ${colorNormal} ${progress * 100}%, ${colorNormal} 100%)`,
                }}
            >
                {children}
            </Button>
        </Tooltip>
    )
};
