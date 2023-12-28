<script lang="ts">
  export let visible: boolean;
  export let enable_mask_close = false;
  let dialog: HTMLDialogElement;
  $: {
    if (dialog) {
      if (visible) {
        dialog.showModal();
      } else {
        dialog.close();
      }
    }
  }

  function handleClose() {
    visible = false;
  }

  function handleDialogClick() {
    enable_mask_close && dialog.close();
  }

  function handleButtonClick() {
    dialog.close();
  }
</script>

<dialog
  bind:this={dialog}
  on:close={handleClose}
  on:click|self={handleDialogClick}
>
  <div on:click|stopPropagation>
    <slot />
  </div>
</dialog>

<style lang="scss" src="./dialog.scss" module></style>
