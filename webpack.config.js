const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);
  
  // Добавляем поддержку PostCSS
  config.module.rules.push({
    test: /\.css$/,
    use: ['postcss-loader'],
  });

  return config;
};
