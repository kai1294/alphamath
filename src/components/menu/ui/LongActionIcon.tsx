import { ActionIcon, ActionIconProps, Box, Center, MantineColor, PolymorphicComponentProps, RingProgress, Tooltip, TooltipProps } from "@mantine/core";
import { LongPressOptions, useLongPress } from "../../../hooks/useLongPress";
import React from "react";
import { useFadingState } from "../../../hooks/useFadingState";

export interface LongActionIconOptions {
    onLongPress: () => void;
    tooltip?: React.ReactNode;
    tooltipProps?: PolymorphicComponentProps<"div", TooltipProps>;
    ringColor?: MantineColor;
    confirmationRingColor?: MantineColor;
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
    confirmationRingColor,
    ...rest
}: LongActionIconProps) => {
    const [showTooltip, setShowTooltip] = useFadingState(false, false, 1000);
    const { progress, props } = useLongPress(onLongPress, {
        ...rest,
        shortClickDuration: rest.shortClickDuration || 400,
        onShortClick() {
            rest.onShortClick?.();
            setShowTooltip(true);
        },
    });
    
    return (
        <Tooltip
            label={tooltip || "Long press"}
            disabled={tooltip === false || !showTooltip}
            opened
            withArrow
            {...tooltipProps}
        >
            <ActionIcon
                {...rest}
                {...props}
            >
                <RingProgress
                    style={{
                        transition: "0.1s",
                    }}
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
                        { value: progress * 100, color: (progress == 1 ? (confirmationRingColor || "green") : (ringColor || "blue")) }
                    ]}
                />
            </ActionIcon>
        </Tooltip>
    )
};
