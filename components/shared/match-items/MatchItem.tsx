import React, { memo, useCallback, useMemo } from "react";
import { View, Image, TouchableWithoutFeedback, useWindowDimensions } from "react-native";
import { Match } from "types/match.types";

import CardStatus from "../../ui/card-status/CardStatus";
import { StyledText } from "components/ui/StyledText";
import Svg, { Path } from "react-native-svg";
import { useMatchesStore } from "store/useMatchesStore";
import MatchDetails from "components/ui/match-details/MatchDetails";
import { clamp } from "react-native-reanimated";
import DetailsArrow from "components/ui/DetailsArrow";
import ScoreAnimated from "../score-animated/ScoreAnimated";

interface MatchItemProps {
  match: Match;
}

const MatchItem: React.FC<MatchItemProps> = memo(({ match }) => {
  const { selectedMatch, selectMatch } = useMatchesStore();

  const { width } = useWindowDimensions();

  const isResize = useMemo(() => width <= 1100, [width]);

  const isDetailsVisible = selectedMatch?.title === match.title;

  const handlePress = useCallback(() => {
    selectMatch(isDetailsVisible ? null : match);
  }, [isDetailsVisible, match, selectMatch]);

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View className="flex flex-col justify-center items-center bg-[#0B0E12] w-full rounded p-4 gap-2 cursor-pointer">
        <View className="flex-row justify-between w-full">
          <View className="flex-row items-center justify-center space-x-2">
            <Image
              source={require("assets/icons/team.png")}
              style={{
                width: clamp(width * 0.02, 28, 36),
                height: clamp(width * 0.02, 28, 36)
              }}
            />
            <StyledText
              className="font-semibold text-white text-base"
              style={{ fontSize: clamp(width * 0.008, 14, 16) }}
            >
              {match.awayTeam.name}
            </StyledText>
          </View>
          <View className=" items-center">
            <View className="flex flex-row">
              <ScoreAnimated score={match.awayScore} className="font-semibold text-white text-lg" />
              <StyledText className="font-semibold text-white text-lg"> : </StyledText>
              <ScoreAnimated score={match.homeScore} className="font-semibold text-white text-lg" />
            </View>
            <CardStatus status={match.status} />
          </View>
          <View className="flex-row items-center justify-center space-x-2">
            <StyledText
              className="font-semibold text-white text-base"
              style={{ fontSize: clamp(width * 0.008, 14, 16) }}
            >
              {match.homeTeam.name}
            </StyledText>
            <Image
              source={require("assets/icons/team.png")}
              style={{
                width: clamp(width * 0.02, 28, 36),
                height: clamp(width * 0.02, 28, 36)
              }}
            />
            {!isResize && (
              <DetailsArrow isDetailsVisible={isDetailsVisible} />
            )}
          </View>
        </View>
        {isDetailsVisible && <MatchDetails />}
        {isResize && (
          <DetailsArrow isDetailsVisible={isDetailsVisible} />
        )}
      </View>
    </TouchableWithoutFeedback>
  );
});

export default MatchItem;
