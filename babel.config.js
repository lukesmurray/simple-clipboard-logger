module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        // browserslist
        targets: {
          browsers: "last 2 chrome versions, last 2 firefox versions, ie 11, last 2 safari versions",
        },
        // add imports for polyfills in each file
        useBuiltIns: "usage",
        // use corejs 3
        corejs: 3,
      },
    ],
  ],
};
