import { Box, Group, Stack, Text } from "@mantine/core";
import { IconAlertTriangle } from "@tabler/icons-react";
import React from "react";

export const ErrorCard = ({
    onRetry,
    error,
    message,
    description,
}: {
    error?: Error;
    message?: React.ReactNode;
    description?: React.ReactNode;
    onRetry?: () => void;
}) => {
    return (
        <Group wrap="nowrap" gap="xs" align="center">
            <Box h="100%" c="yellow">
                <IconAlertTriangle />
            </Box>
            <Stack gap={0} style={{ textWrap: "nowrap" }}>
                <Text>{error?.name || message}</Text>
                <Text c="dimmed">{error?.message || description}</Text>
            </Stack>
        </Group>
    )
};
