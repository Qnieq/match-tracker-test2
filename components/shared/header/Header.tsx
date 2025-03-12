import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Alert, Animated, Image, TouchableOpacity, TouchableWithoutFeedback, View, useWindowDimensions } from "react-native";
import { useMatchesStore } from "store/useMatchesStore";

import Loader from "../../ui/Loader";
import { StyledText } from "components/ui/StyledText";
import Svg, { Path } from "react-native-svg";
import { toast } from "sonner-native";

const Header = () => {
    const { error, loading, selectedStatus, fetchMatches, selectStatus } = useMatchesStore();
    const { width } = useWindowDimensions();

    const [filterMenuOpen, setFilterMenuOpen] = useState(false);

    const isResize = useMemo(() => width <= 768, [width]);

    const notification = () => {
        toast.error("Ошибка: не удалось загрузить информацию");
    };

    const errorNotified = useRef(false);

    useEffect(() => {
        if (error && width <= 1260 && !errorNotified.current) {
            notification();
            errorNotified.current = true;
        }
        if (!error) {
            errorNotified.current = false;
        }
    }, [error, width]);

    const handleRefresh = useCallback(() => {
        fetchMatches(true);
    }, [fetchMatches]);

    const rotation = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(rotation, {
            toValue: filterMenuOpen ? 1 : 0,
            duration: 300,
            useNativeDriver: true,
        }).start();
    }, [filterMenuOpen]);

    const rotateInterpolate = rotation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '180deg'],
    });

    return (
        <View
            className={`flex flex-row flex-wrap  py-6 min-h-24 ${isResize ? "justify-center" : "justify-between"
                } items-center relative z-10`}
            style={{
                gap: isResize ? 10 : 20
            }}
        >
            <View
                className="flex flex-row items-center justify-center gap-[20px] z-10"
                style={{
                    flexDirection: isResize ? "column" : "row",
                    width: isResize ? "100%" : "auto"
                }}
            >
                <Image
                    source={require("assets/images/logo.png")}
                    className="w-[258px] h-[23px]"
                    resizeMode="contain"
                />
                <TouchableWithoutFeedback onPress={() => setFilterMenuOpen((prev) => !prev)}>
                    <View
                        className={`flex-col justify-center items-center z-9 bg-[${filterMenuOpen ? "#0B0E12" : "#0F1318"}] 
                        ${filterMenuOpen ? "border-[#171D25]" : ""} border rounded cursor-pointer relative box-content`}
                        style={{ width: isResize ? "100%" : 170, height: 56, minWidth: 170 }}
                    >
                        <View
                            className="flex-row gap-[12px] w-full"
                            style={{
                                justifyContent: isResize ? "space-between" : "center",
                                paddingHorizontal: isResize ? 16 : 0
                            }}
                        >
                            <StyledText className="text-white font-bold text-[16px]">
                                {selectedStatus === "All" ? "Все статусы" : selectedStatus}
                            </StyledText>
                            <Animated.View
                                style={{
                                    transform: [{ rotate: rotateInterpolate }],
                                }}
                            >
                                <Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <Path d="M14.932 6.81567H5.06536C4.26536 6.81567 3.86536 7.78234 4.43203 8.34901L8.74869 12.6657C9.44036 13.3573 10.5654 13.3573 11.257 12.6657L12.8987 11.024L15.5737 8.34901C16.132 7.78234 15.732 6.81567 14.932 6.81567Z" fill="white" />
                                </Svg>
                            </Animated.View>
                        </View>
                        {filterMenuOpen && (
                            <View
                                className="flex-col items-center justify-center absolute top-[64px] rounded z-10"
                                style={{ width: isResize ? "100%" : "auto" }}
                            >
                                {(["All", "Live", "Finished", "Match preparing"] as const).map((filt) => (
                                    <TouchableWithoutFeedback key={filt} onPress={() => selectStatus(filt)}>
                                        <View
                                            className="flex-row items-center justify-start h-[48px] px-[12px] py-[8px] bg-[#0F1318]"
                                            style={{ width: isResize ? "100%" : 170 }}
                                        >
                                            <StyledText className={selectedStatus === filt ? "text-blue-500 font-bold" : "text-white"}>{filt === "All" ? "Все статусы" : filt}</StyledText>
                                        </View>
                                    </TouchableWithoutFeedback>
                                ))}
                            </View>
                        )}
                    </View>
                </TouchableWithoutFeedback>
            </View>
            <View className={`flex-row items-center gap-3 ${isResize ? "w-full" : ""} z-1`}>
                {error && width > 1260 && (
                    <View className="flex-row items-center justify-center bg-[#0F1318] w-[480px] h-[56px] p-4 rounded gap-[10px]">
                        <Svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                            <Path d="M14.0123 11.6852V14.0185M14.0123 18.6852V18.6968M5.84556 23.3518H22.1789C22.5596 23.3492 22.9338 23.2534 23.269 23.0729C23.6042 22.8923 23.8901 22.6325 24.1018 22.3161C24.3135 21.9997 24.4446 21.6363 24.4836 21.2576C24.5226 20.8789 24.4683 20.4964 24.3256 20.1435L16.0422 5.85185C15.8404 5.48714 15.5446 5.18315 15.1856 4.97146C14.8266 4.75978 14.4174 4.64813 14.0006 4.64813C13.5838 4.64813 13.1746 4.75978 12.8155 4.97146C12.4565 5.18315 12.1607 5.48714 11.9589 5.85185L3.67556 20.1435C3.53549 20.4884 3.47995 20.8617 3.51357 21.2324C3.54719 21.603 3.66899 21.9603 3.86882 22.2743C4.06864 22.5883 4.34069 22.85 4.66224 23.0374C4.98379 23.2249 5.34552 23.3327 5.71723 23.3518" stroke="#EB0237" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
                        </Svg>
                        <StyledText className="flex-row items-center text-white font-medium">
                            Ошибка: не удалось загрузить информацию
                        </StyledText>
                    </View>
                )}
                <TouchableOpacity
                    onPress={handleRefresh}
                    disabled={loading}
                    className={`flex-row items-center justify-center gap-3 bg-[#EB0237] rounded p-4 ${loading ? "opacity-50" : ""}`}
                    style={{ width: isResize ? "100%" : 204, height: 56, minWidth: 204 }}
                >
                    <StyledText className="text-white font-semibold">Обновить</StyledText>
                    {loading && <Loader />}
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Header;
