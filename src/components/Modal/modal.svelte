<script context="module" lang="ts">
  export interface Modal {
    close: () => void;
    open: () => void;
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

  //添加动画
  import { fade } from "svelte/transition";

  //组件挂载的时候需要挂载到body 上面
  onMount(() => {
    document.body.appendChild(currentModal);
  });

  //改变弹窗的显示隐藏
  function changeVisible(_visible: boolean) {
    if (visible === _visible) {
      return;
    }
    visible = _visible;
  }

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
  function open() {
    changeVisible(true);
    openEffect();
  }

  //定义挂载到modal 的close 函数
  function close() {
    changeVisible(false);
    closeEffect();
  }

  //挂载到modal上(通过getModal 可以丛外部拿到此modal的示例)
  modal = { open, close };

  //当弹窗销毁时，调用close 的副作用函数，清除window 上面添加的addEventListener,以及body 的可滑动
  onDestroy(closeEffect);

  function handleMaskClick() {
    close();
  }
</script>

<div class="modal" bind:this={currentModal}>
  {#if visible}
    <div class="modal-inner">
      <div
        class="mask"
        on:click|stopPropagation={handleMaskClick}
        transition:fade
      />
      <div class="content" on:click|stopPropagation={() => {}}>
        <slot />
      </div>
    </div>
  {/if}
</div>

<style lang="scss" src="./modal.scss"></style>
