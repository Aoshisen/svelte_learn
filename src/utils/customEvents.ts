//储存原始的localStorage
const originalStorage = localStorage;

//自定义Storage事件
const customStorageEvent = function (key: string, value: string) {
  const oldValue = originalStorage.getItem(key);
  let setEvent = new StorageEvent("setItem", {
    bubbles: true,
    cancelable: true,
    key: key,
    newValue: value,
    oldValue,
  });
  window.dispatchEvent(setEvent);
};

//自定义localStorage.setItem 事件
const customSetItem = function (
  this: Storage["setItem"],
  key: string,
  value: string
) {
  customStorageEvent(key, value);
  originalStorage.setItem(key, value);
};

//自定义组装一个localStorage 对象
const customStorage = {
  ...localStorage,
  setItem: customSetItem,
};

//将 自定义组装的customStorage 替换掉 window.localStorage 对象,
// 将这个函数包装起来供外部使用
export const injectCustomEventWhenSetItem = () => {
  Object.defineProperty(window, "localStorage", {
    value: customStorage,
  });
};

//测试监听 自定义事件是否在setItem 的时候触发
//暴露出一个函数，当我们的自定义事件触发的时候触发我们传递进来的函数，并且把我们的函数的参数传递给他
type TCaller = (e: Event) => unknown;
export const watchSetItem = (caller: TCaller) => {
  window.addEventListener("setItem", (e) => {
    caller(e);
  });
};