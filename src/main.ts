import { default as App } from "./App.svelte";
import { getNode } from "./utils";
import { Context, createContext } from "./context";

export const app = new App({
  target: getNode("#app") as HTMLDivElement,
  props: {
    message: "this is a custom Message In App",
  },
});

//改变全局的setItem 方法，派发自定义事件
let ctx = await createContext();
window.ctx = ctx;
ctx.setting.update({ name: "update name", age: 12 });
ctx.setting.get();
