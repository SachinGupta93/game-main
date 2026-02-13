import { useCallback, useEffect, useRef, useState } from 'react';

export function useTimer(initialTime, onTimeout, isPaused) {
    const [timeLeft, setTimeLeft] = useState(initialTime);
    const intervalRef = useRef(null);
    const onTimeoutRef = useRef(onTimeout);

    useEffect(() => {
        onTimeoutRef.current = onTimeout;
    }, [onTimeout]);

    const startTimer = useCallback((time) => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setTimeLeft(time);

        intervalRef.current = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(intervalRef.current);
                    intervalRef.current = null;
                    setTimeout(() => onTimeoutRef.current(), 0);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    }, []);

    const stopTimer = useCallback(() => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    }, []);

    const addTime = useCallback((seconds) => {
        setTimeLeft(prev => prev + seconds);
    }, []);

    const subtractTime = useCallback((seconds) => {
        setTimeLeft(prev => Math.max(0, prev - seconds));
    }, []);

    // Handle pause/resume
    useEffect(() => {
        if (isPaused && intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        } else if (!isPaused && timeLeft > 0 && !intervalRef.current) {
            intervalRef.current = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev <= 1) {
                        clearInterval(intervalRef.current);
                        intervalRef.current = null;
                        setTimeout(() => onTimeoutRef.current(), 0);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
    }, [isPaused, timeLeft]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, []);

    return { timeLeft, startTimer, stopTimer, addTime, subtractTime };
}
