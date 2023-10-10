/** @type {import("@babel/core").ConfigFunction} */
module.exports = function (api) {
  api.cache.forever();

  return {
    presets: ['babel-preset-expo'],
    plugins: [
      require.resolve('expo-router/babel'),
      'transform-inline-environment-variables',
      'react-native-reanimated/plugin',
    ],
  };
};
