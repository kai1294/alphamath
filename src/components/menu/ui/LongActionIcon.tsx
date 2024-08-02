import { ActionIcon, ActionIconProps, Box, Center, PolymorphicComponentProps, RingProgress } from "@mantine/core";
import { useLongPress } from "../../../hooks/useLongPress";

export const LongActionIcon = ({
    children,
    onLongPress,
    duration,
    ...aiProps
}: PolymorphicComponentProps<"button", ActionIconProps> & {
    onLongPress: () => void;
    duration?: number;
}) => {
    const { progress, props } = useLongPress(onLongPress, { duration });
    
    return (
        <ActionIcon
            {...aiProps}
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
                    { value: progress * 100, color: "blue" }
                ]}
            />
        </ActionIcon>
    )
};
