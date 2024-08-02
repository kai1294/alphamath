import { useState } from "react";

export const useLongPress = (onLongPress: () => void, {
    duration = 1000,
}: {
    duration?: number,
}) => {
    const [progress, setProgress] = useState(0);

    return {

    };
};
