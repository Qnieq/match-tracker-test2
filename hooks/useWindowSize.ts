import { useState, useEffect } from 'react';
import { Dimensions } from 'react-native';

function useWindowSize() {
    const [windowSize, setWindowSize] = useState(() => {
        const { width, height } = Dimensions.get('window');
        return { width, height };
    });

    useEffect(() => {
        const onChange = ({ window }: { window: { width: number; height: number } }) => {
            setWindowSize(prev =>
                prev.width !== window.width || prev.height !== window.height
                    ? { width: window.width, height: window.height }
                    : prev
            );
        };

        const subscription = Dimensions.addEventListener('change', onChange);
        return () => subscription.remove();
    }, []);

    return windowSize;
}

export default useWindowSize;
