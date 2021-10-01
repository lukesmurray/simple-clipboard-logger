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
        corejs: {
          version: 3,
          proposals: true,
        },
        debug: false,
        loose: true,
        exclude: [
          "es.array.concat",
          "es.array.join",
          "es.array.slice",
          "es.number.*", // as long as you use the global functions instead (parseInt, parseFloat, isNaN, etc.)
          "es.object.keys",
          "es.object.to-string",
          "es.regexp.to-string",
          "es.string.match", // as long as you don't use newer regex modifiers or syntax
          "es.string.replace", // as long as you don't use newer regex modifiers or syntax
          "es.string.split", // as long as you don't use newer regex modifiers or syntax
        ],
      },
    ],
  ],
};
