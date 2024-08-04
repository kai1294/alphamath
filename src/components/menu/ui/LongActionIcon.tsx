import { ActionIcon, ActionIconProps, Box, Center, MantineColor, PolymorphicComponentProps, RingProgress, Tooltip, TooltipProps } from "@mantine/core";
import { LongPressOptions, useLongPress } from "../../../hooks/useLongPress";
import React from "react";
import { useFadingState } from "../../../hooks/useFadingState";

export interface LongActionIconOptions {
    onLongPress: () => void;
    tooltip?: React.ReactNode;
    tooltipProps?: PolymorphicComponentProps<"div", TooltipProps>;
    ringColor?: MantineColor;
};

export type LongActionIconProps = LongActionIconOptions
    & LongPressOptions
    & PolymorphicComponentProps<"button", ActionIconProps>
    & React.PropsWithChildren;

export const LongActionIcon = ({
    children,
    onLongPress,
    tooltip,
    tooltipProps,
    ringColor,
    ...rest
}: LongActionIconProps) => {
    const [show, setShow] = useFadingState(false, false, 1000);
    const { progress, props } = useLongPress(onLongPress, {
        ...rest,
        shortClickDuration: rest.shortClickDuration || 100,
        onShortClick() {
            rest.onShortClick?.();
            setShow(true);
        },
    });
    
    return (
        <Tooltip
            label={tooltip || "Long press"}
            disabled={!show}
            opened
            withArrow
            {...tooltipProps}
        >
            <ActionIcon
                {...rest}
                {...props}
            >
                <RingProgress
                    style={{ transition: "0.1s" }}
                    label={(
                        <Center>
                            <Box style={{
                                scale: progress ? "0.5" : "1",
                                transition: "0.2s",
                            }}>
                                {children}
                            </Box>
                        </Center>
                    )}
                    size={30}
                    thickness={progress ? 3 : 0}
                    sections={[
                        { value: progress * 100, color: ringColor || "blue" }
                    ]}
                />
            </ActionIcon>
        </Tooltip>
    )
};
