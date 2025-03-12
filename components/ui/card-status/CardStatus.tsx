import React from "react";
import { View, useWindowDimensions } from "react-native";

import { cardColor } from "./cardColor";
import { StyledText } from "../StyledText";
import { clamp } from "react-native-reanimated";

interface ICardStatusProps {
  status: string;
}

const CardStatus: React.FC<ICardStatusProps> = ({ status }) => {
  const { bgColor, status: cardStatus } = cardColor(status);

  const { width } = useWindowDimensions()

  return (
    <View
      className={`${bgColor} py-1.5 px-2 rounded`}
      style={{
        width: clamp(width * 0.05, 75, 92)
      }}
    >
      <StyledText className="text-center text-white font-semibold text-[12px]">
        {cardStatus}
      </StyledText>
    </View>
  );
};

export default CardStatus;
