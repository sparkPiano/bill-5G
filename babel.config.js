module.exports = {
  presets: [
    "@vue/app",
    ["@babel/env", { modules: false, debug: true, targets: {} }]
  ],
  plugins: [
    "@babel/plugin-proposal-class-properties",
    [
      "@babel/plugin-transform-runtime",
      {
        corejs: 3
      }
    ]
  ]
};
