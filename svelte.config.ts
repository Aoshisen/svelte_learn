export const config = {
  settings: {
    "svelte3/ignore-warnings": (warning) => {
      return warning.code === "a11y-click-events-have-key-events";
    },
  },
  type: "module",
};
