module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        // browserslist
        targets: {
          browsers: "> 0.5%, ie >= 11",
        },
        // add imports for polyfills in each file
        useBuiltIns: "usage",
        // use corejs 3
        corejs: 3,
      },
    ],
  ],
};
