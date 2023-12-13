<script lang="ts">
  import { onMount, createEventDispatcher } from "svelte";
  import { fade } from "svelte/transition";
  import { enableScroll, disableScroll } from "@utils";
  export let visible: boolean = false;
  export let enable_mask_close: boolean = true;
  const dispatcher = createEventDispatcher();
  let currentModal: HTMLElement;
  onMount(() => {
    document.body.appendChild(currentModal);
  });
  // 将事件名称抽象为常量
  enum MODAL_EVENT {
    OPEN = "open",
    CLOSE = "close",
  }
  $: {
    if (visible) {
      dispatcher(MODAL_EVENT.OPEN);
      disableScroll();
    } else {
      dispatcher(MODAL_EVENT.OPEN);
      enableScroll();
    }
  }

  function handleMaskClick() {
    if (!enable_mask_close) {
      return;
    }
    visible = false;
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

<style lang="scss" src="./modal.scss" module></style>
