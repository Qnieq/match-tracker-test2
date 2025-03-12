import { StyledText } from "components/ui/StyledText";
import { useEffect, useRef, useState } from "react";
import { Animated } from "react-native";

const AnimatedStyledText = Animated.createAnimatedComponent(StyledText);

const ScoreAnimated: React.FC<{ score: number; style?: any, className?: any }> = ({ score, style, className }) => {
    const animatedValue = useRef(new Animated.Value(score)).current;
    const [display, setDisplay] = useState(score);

    useEffect(() => {
        Animated.timing(animatedValue, {
            toValue: score,
            duration: 500,
            useNativeDriver: false,
        }).start();
        const id = animatedValue.addListener(({ value }) => {
            setDisplay(Math.floor(value));
        });
        return () => {
            animatedValue.removeListener(id);
        };
    }, [score]);
    
    return <AnimatedStyledText style={style} className={className}>{display}</AnimatedStyledText>;
}

export default ScoreAnimated;