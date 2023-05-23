import App from "./App.svelte";
import { injectCustomEventWhenSetItem, watchSetItem } from "./utils";

//改变全局的setItem 方法，派发自定义事件
injectCustomEventWhenSetItem();

export const app = new App({
  target: document.getElementById("app") as HTMLDivElement,
  props: {
    message: "this is a custom Message In App",
  },
});

//注意调用顺序，只有当全局的injectCustomEventWhenSetItem调用之后，自定义的监听事件才会被触发
watchSetItem((e) => {
  // console.log(e, "这是监听自定义事件的触发函数");
});
