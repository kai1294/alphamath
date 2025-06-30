import { useInterval } from "@mantine/hooks";
import React, { useEffect, useRef, useState } from "react";

export interface LongPressOptions {
    duration?: number;
    shortClickDuration?: number;
    onShortClick?: () => void;
};

export const useLongPress = (onLongPress: () => void, {
    duration = 1000,
    shortClickDuration,
    onShortClick,
}: LongPressOptions) => {
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

    const onInputDown = () => {
        setStartTime(Date.now());
        setProgress(0.01);
    };

    const onInputCancel = () => {
        setStartTime(null);
        setProgress(0);
    };

    const onInputUp = () => {
        let heldDownFor = Date.now() - (startTime || 0);
        if (startTime && shortClickDuration && (shortClickDuration > heldDownFor)) {
            onShortClick?.();
        } else if (progress >= 1) {
            onLongPress();
        }

        setStartTime(null);
        setProgress(0);
    };

    return {
        progress: Math.min(progress, 1),
        props: {
            onMouseDown: (e: React.MouseEvent<HTMLElement>) => { e.stopPropagation(); onInputDown(); },
            onMouseUp: (e: React.MouseEvent<HTMLElement>) => { e.stopPropagation(); onInputUp(); },
            onTouchStart: (e: React.TouchEvent<HTMLElement>) => { e.stopPropagation(); onInputDown(); },
            onTouchEnd: (e: React.TouchEvent<HTMLElement>) => { e.stopPropagation(); onInputUp(); },
            onTouchCancel: (e: React.TouchEvent<HTMLElement>) => { e.stopPropagation(); onInputCancel(); },
            onMouseLeave: (e: React.MouseEvent<HTMLElement>) => { e.stopPropagation(); onInputCancel(); },
        },
    };
};
