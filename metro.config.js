const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

// Блокируем возможные конфликты с React Native
config.resolver.blockList = [/.*\/node_modules\/react-native\/.*/];

module.exports = withNativeWind(config, { input: "./global.css" });
