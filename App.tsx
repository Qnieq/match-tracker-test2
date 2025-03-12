import "./global.css";
import MatchTracker from "./components/features/match-tracker/MatchTracker";
import Header from "./components/shared/header/Header";
import { useFonts } from "expo-font";
import { View, useWindowDimensions, StyleSheet } from "react-native";
import { Toaster } from "sonner-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView, ScrollView } from "react-native-gesture-handler";

export default function App() {
  const { width } = useWindowDimensions();
  const isMobile = width <= 545;

  const [fontsLoaded] = useFonts({
    'Inter': require('./assets/fonts/Inter-VariableFont.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  const containerStyle = isMobile
    ? styles.mobileContainer
    : styles.desktopContainer;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ScrollView>
          <View
            className="flex flex-col flex-1 bg-[#06080c] pt-4 min-h-[100dvh]"
            style={containerStyle}
          >
            <Header />
            <MatchTracker />
            <Toaster
              theme="dark"
              position="bottom-center"
              duration={3000}
              closeButton={true}
            />
          </View>
        </ScrollView>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  mobileContainer: {
    padding: 22,
    gap: 20,
  },
  desktopContainer: {
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 32,
    paddingRight: 32,
  },
});
