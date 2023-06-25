<script context="module" lang="ts">
  export interface Modal {
    close: () => void;
    open: (callback?: any) => void;
  }

  let modal: Modal;

  export function getModal() {
    return modal;
  }
</script>

<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  let currentModal: HTMLElement;
  let visible = false;
  let closeCallback: () => void;
  import { fade } from "svelte/transition";

  onMount(() => {
    document.body.appendChild(currentModal);
  });

  //打开弹窗的副作用函数
  function openEffect() {
    window.addEventListener("keydown", close);
    document.body.style.overflow = "hidden";
  }

  //关闭弹窗的副作用函数
  function closeEffect() {
    window.removeEventListener("keydown", close);
    document.body.style.overflow = "";
  }

  //定义挂载到modal 的open 函数
  function open(callback: any) {
    closeCallback = callback;
    if (visible) return;
    openEffect();
    visible = true;
  }

  //定义挂载到modal 的close 函数
  function close() {
    if (!visible) return;
    visible = false;
    closeEffect();
    closeCallback && closeCallback();
  }

  //挂载到modal上(通过getModal 可以丛外部拿到此modal的示例)
  modal = { open, close };

  //当弹窗销毁时，调用close 的副作用函数，清除window 上面添加的addEventListener,以及body 的可滑动
  onDestroy(closeEffect);

  function handleMaskClick() {
    close();
  }
</script>

<div id="modal" bind:this={currentModal}>
  {#if visible}
    <div id="modal-inner">
      <div
        id="mask"
        on:click|stopPropagation={handleMaskClick}
        transition:fade
      />
      <!-- 阻止modal 里面的点击事件冒泡到全局 -->
      <div id="content" on:click|stopPropagation={() => {}}>
        <slot />
      </div>
    </div>
  {/if}
</div>

<style lang="scss" src="./modal.scss"></style>
