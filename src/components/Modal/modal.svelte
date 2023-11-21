<script lang="ts">
  import { onMount, createEventDispatcher } from "svelte";
  let currentModal: HTMLElement;
  export let visible: boolean = false;
  export let enable_mask_close: boolean = true;
  import { fade } from "svelte/transition";
  const dispatcher = createEventDispatcher();
  
  onMount(() => {
    document.body.appendChild(currentModal);
  });

  function openEffect() {
    document.body.style.overflow = "hidden";
  }

  function closeEffect() {
    document.body.style.overflow = "";
  }

  $: {
    if (visible) {
      openEffect();
      dispatcher("open");
    } else {
      closeEffect();
      dispatcher("close");
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
