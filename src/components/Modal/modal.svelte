<script context="module" lang="ts">
  interface Modal {
    close: () => void;
    open: (callback?: any) => void;
  }
  interface Modals {
    [name: string]: Modal;
  }
  let onTop: HTMLElement;
  const modals: Modals = {};

  export function getModal(id = "") {
    return modals[id];
  }
</script>

<script lang="ts">
  import { onDestroy } from "svelte";

  let topDiv: HTMLElement;
  let visible = true;
  let prevOnTop: HTMLElement;
  let closeCallback: (e?: number) => void;

  export let id = "";

  function keyPress(ev: KeyboardEvent) {
    if (ev.key == "Escape" && onTop == topDiv) close(); //ESC
  }

  //定义open close 两个api 的具体逻辑
  function open(callback: any) {
    closeCallback = callback;

    //如果当前modal 正在显示，那么直接return
    if (visible) return;
    // 如果添加了多个元素，区分之前的弹窗和最上面的弹窗，
    //之前的弹窗就是当前的onTop,
    prevOnTop = onTop;
    //现在的onTop 就是最新的topDiv
    onTop = topDiv;

    window.addEventListener("keydown", keyPress);

    //阻止body 滚动
    document.body.style.overflow = "hidden";

    visible = true;

    //添加元素到body 的最后面,
    document.body.appendChild(topDiv);
  }

  function close(retVal?: number) {
    if (!visible) return;
    window.removeEventListener("keydown", keyPress);
    onTop = prevOnTop;
    if (onTop == null) document.body.style.overflow = "";
    visible = false;
    if (closeCallback) closeCallback(retVal);
  }

  //暴露出open 和close 两个api
  modals[id] = { open, close };

  onDestroy(() => {
    delete modals[id];
    window.removeEventListener("keydown", keyPress);
  });
</script>

<div id="topModal" class:visible bind:this={topDiv}>
  <div id="modal" on:click|stopPropagation={() => {}}>
    <div id="modal-content">
      <slot />
    </div>
  </div>
</div>

<style lang="scss" src="./modal.scss"></style>
