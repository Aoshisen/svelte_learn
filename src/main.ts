import App from "./App.svelte";

export const app = new App({
  target: document.getElementById("app") as HTMLDivElement,
  props: {
    message: "this is a custom Message In App",
  },
});

export const otherApp = new App({
  target: document.getElementById("anotherApp") as HTMLDivElement,
  props: {
    message: "Another App",
  },
});

const originalSetItem = localStorage.setItem;

const customEvent = function (key: string, value: string) {
  let setEvent = new CustomEvent("setItemEvent", {
    detail: {
      key,
      value,
    },
  });
  window.dispatchEvent(setEvent);
};

const customSetItem = function (
  this: Storage["setItem"],
  key: string,
  value: string
) {
  customEvent(key, value);
  originalSetItem.apply(this, [key, value]);
};

// const customLocalStorage = {
//   ...window.localStorage,
//   setItem: customSetItem,
// };

// Object.defineProperty(window, "localStorage", {
//   value: customLocalStorage,
// });

localStorage.setItem = customSetItem;
// Storage.prototype.setItem = customSetItem;
// Object.defineProperty(localStorage, "setItem", () => {
//   console.log("ass");
// });

window.addEventListener("setItemEvent", (e) => {
  console.log("自定义事件触发", e);
});
