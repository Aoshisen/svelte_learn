import { log } from "console";
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

export const otherApp = new App({
  target: document.getElementById("anotherApp") as HTMLDivElement,
  props: {
    message: "Another App",
  },
});

//注意调用顺序，只有当全局的injectCustomEventWhenSetItem调用之后，自定义的监听事件才会被触发
watchSetItem((e) => {
  console.log(e, "这是监听自定义事件的触发函数");
});

class Node {
  private _head: null | Node;
  private _next: Node | null;
  public current: number;
  constructor(current: number) {
    this._head = null;
    this.current = current;
    this._next = null;
  }
  public set next(v: Node | null) {
    this._next = v;
    if (v) {
      v._head = this;
    }
  }
  public get next() {
    return this._next;
  }
  public set head(v: Node | null) {
    this._head = v;
    if (v) {
      v._next = this;
    }
  }

  public get head() {
    return this._head;
  }
}

class LinkList {
  public size = 0;
  public _value: any;
  constructor(list: Array<number>) {
    this.size = list.length;
    this._value = null;
  }

  public set(v: string) {
    this._value = v;
  }
  public get() {
    return this._value;
  }
}

const n1 = new Node(1);
const n2 = new Node(2);
const n3 = new Node(3);

n1.next = n2;
n2.next = n3;

console.log(n1);
