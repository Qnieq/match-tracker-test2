import { Image, useWindowDimensions, View } from "react-native";
import { useMatchesStore } from "../../../store/useMatchesStore";
import { StyledText } from "../StyledText";
import { clamp } from 'react-native-reanimated';
import { Fragment, useMemo } from "react";

const MatchDetails = () => {

    const { selectedMatch } = useMatchesStore();

    const { width } = useWindowDimensions();

    const isResizePlayer = useMemo(() => width <= 1630, [width]);

    const isResizeStatistic = useMemo(() => width <= 1100, [width]);

    return (
        <View
            className="flex flex-row justify-between items-center w-full pt-4 pb-2"
            style={{
                flexDirection: isResizeStatistic ? "column" : "row",
                gap: isResizeStatistic ? 8 : 32
            }}
        >
            {[selectedMatch?.awayTeam, selectedMatch?.homeTeam].map((team, teamIndex) => (
                <Fragment key={teamIndex}>
                    <View
                        key={teamIndex}
                        className={`gap-2 w-${isResizeStatistic ? "full" : "1/2"}`}
                        style={{
                            flex: 1,
                        }}
                    >
                        <View className="flex flex-row w-full gap-[8px]">
                            {team?.players.map((player, playerIndex) => (
                                <View
                                    key={player.username + playerIndex}
                                    style={{
                                        flex: 1,
                                        height: isResizePlayer ? 71 : 52,
                                        flexDirection: isResizePlayer ? "column" : "row",
                                        justifyContent: isResizePlayer ? "center" : "space-between",
                                        gap: isResizePlayer ? 4 : 8,
                                    }}
                                    className="flex-row justify-between items-center w-1/3 px-6 bg-[#101318] rounded"
                                >
                                    <View className="flex-row items-center gap-2">
                                        <Image
                                            source={require("../../../assets/icons/player.png")}
                                            style={{
                                                width: clamp(width * 0.02, 32, 36),
                                                height: clamp(width * 0.02, 32, 36)
                                            }}
                                            resizeMode="contain"
                                        />
                                        <StyledText
                                            className="text-white font-semibold"
                                            style={{ fontSize: clamp(width * 0.008, 14, 16) }}
                                        >
                                            {player.username}
                                        </StyledText>
                                    </View>
                                    <View className="flex flex-row items-center gap-2">
                                        <StyledText
                                            className="text-[#FAFAFA66]"
                                            style={{ fontSize: clamp(width * 0.008, 12, 14) }}
                                        >
                                            Убийств:
                                        </StyledText>
                                        <StyledText
                                            className="text-white font-semibold "
                                            style={{ fontSize: clamp(width * 0.008, 14, 16) }}
                                        >
                                            {player.kills}
                                        </StyledText>
                                    </View>
                                </View>
                            ))}
                        </View>
                        <View className="flex flex-row justify-between items-center w-full h-[52px] gap-2 px-6 bg-[#101318] rounded">
                            {[
                                { key: "points", label: "Points:", value: `+${team?.points}` },
                                { key: "place", label: "Место:", value: team?.place },
                                { key: "total_kills", label: "Всего убийств:", value: team?.total_kills },
                            ].map((stat, index) => (
                                <View
                                    key={stat.key}
                                    className={`flex flex-row items-center justify-center gap-2 w-1/3 ${index < [1, 2, 3].length - 1 ? "border-[#141A21] border-r-[1px]" : ""
                                        }`}
                                >
                                    <StyledText
                                        className="text-[#FAFAFA66]"
                                        style={{ fontSize: clamp(width * 0.008, 12, 14) }}
                                    >
                                        {stat.label}
                                    </StyledText>
                                    <StyledText
                                        className="text-white font-semibold text-[16px]"
                                        style={{ fontSize: clamp(width * 0.008, 14, 16) }}
                                    >
                                        {stat.value}
                                    </StyledText>
                                </View>
                            ))}
                        </View>
                    </View>
                    {teamIndex === 0 && isResizeStatistic && (
                        <View key={`divider-${teamIndex}`} className="flex-row gap-[10px] items-center justify-center w-full">
                            <View className="h-[1px] w-[40%] bg-[#13181F]"></View>
                            <StyledText className="text-[#313A47] font-semibold">VS</StyledText>
                            <View className="h-[1px] w-[40%] bg-[#13181F]"></View>
                        </View>
                    )}
                </Fragment>

            ))
            }
        </View >
    );
}

export default MatchDetails