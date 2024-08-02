import { useInterval } from "@mantine/hooks";
import React, { useEffect, useRef, useState } from "react";

export const useLongPress = (onLongPress: () => void, {
    duration = 1000,
}: {
    duration?: number,
}) => {
    const [progress, setProgress] = useState(0);
    const [startTime, setStartTime] = useState<number | null>(null);

    const { start, stop } = useInterval(() => {
        if(!startTime) {
            setProgress(0);
            stop();
            return;
        }

        setProgress(Math.min(1, Math.max(0, (
            (Date.now()-startTime) / duration
        ))));
    }, 20, {
        autoInvoke: false
    });

    useEffect(() => {
        if(!startTime) {
            stop();
            setProgress(0);
        };
        start();
    }, [startTime]);

    useEffect(() => {
        if(progress == 1) {
            onLongPress();
            setStartTime(null);
        }
    }, [progress]);

    const onInputDown = () => {
        setStartTime(Date.now());
        setProgress(0.01);
    };

    const onInputUp = () => {
        setStartTime(null);
        setProgress(0);
    };

    return {
        progress,
        props: {
            onMouseDown: (e: React.MouseEvent<HTMLElement>) => onInputDown(),
            onMouseUp: (e: React.MouseEvent<HTMLElement>) => onInputUp(),
            onTouchStart: (e: React.TouchEvent<HTMLElement>) => onInputDown(),
            onTouchEnd: (e: React.TouchEvent<HTMLElement>) => onInputUp(),
        },
    };
};
