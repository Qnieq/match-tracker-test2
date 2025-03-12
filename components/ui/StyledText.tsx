import { Text, TextProps } from "react-native";
import { forwardRef } from "react";

export const StyledText = forwardRef<Text, TextProps>(({ children, style, ...props }, ref) => (
    <Text ref={ref} style={[{ fontFamily: 'Inter' }, style]} {...props}>
        {children}
    </Text>
));
