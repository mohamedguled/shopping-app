export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  backgrounds: {
    default: "darkblue",
    values: [
      {
        name: "darkblue",
        value: "#0f1729"
      }
    ]
  }
}