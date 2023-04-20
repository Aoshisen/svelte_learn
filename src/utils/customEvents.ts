const customEvent = new CustomEvent("ass", {
  detail: {
    name: "",
    value: "",
  },
});

window.dispatchEvent(customEvent);

export { customEvent };
