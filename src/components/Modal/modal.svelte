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
  import { onDestroy } from "svelte";

  let currentModal: HTMLElement;
  let visible = false;
  let closeCallback: () => void;

  function openEffect() {
    window.addEventListener("keydown", close);
    document.body.style.overflow = "hidden";
  }

  function closeEffect() {
    window.removeEventListener("keydown", close);
    document.body.style.overflow = "";
  }

  function open(callback: any) {
    closeCallback = callback;
    if (visible) return;
    openEffect();
    visible = true;
    document.body.appendChild(currentModal);
  }

  function close() {
    if (!visible) return;
    visible = false;
    closeEffect();
    closeCallback && closeCallback();
  }

  modal = { open, close };

  onDestroy(() => {
    closeEffect();
  });
</script>

<div
  id="topModal"
  class:visible
  bind:this={currentModal}
  on:click|stopPropagation={() => {
    console.log("topClose");
    close();
  }}
>
  <div id="modal" on:click|stopPropagation={() => {}}>
    <div id="modal-content">
      <slot />
    </div>
  </div>
</div>

<style lang="scss" src="./modal.scss"></style>
