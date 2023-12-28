<script lang="ts">
  import { Counter, Modal, Dialog } from "@components";
  export let message = "hello";
  let visible: boolean = false;

  function handleOpen() {
    visible = true;
  }

  function handleClose() {
    console.log("handleClose");
    visible = false;
  }
  function onOpen() {
    console.log("onOpen");
  }
  function onClose() {
    console.log("onClose");
  }
  console.log(import.meta.env.VITE_APP_ENV, "app_env in code");
</script>

<main class="main">
  <h1>{message}</h1>
  <button on:click={handleOpen}>add Modal</button>
  <button on:click={handleClose}>close</button>
  <Counter />

  <div class="grid">
    <div class="item">1</div>
    <div class="item">2</div>
    <div class="item">3</div>
    <div class="item">4</div>
  </div>

  <!-- <Modal bind:visible on:close={onClose} on:open={onOpen}>
    <div on:click={handleClose}>弹窗里面关闭</div>
  </Modal> -->
  <Dialog bind:visible enable_mask_close>
    <div on:click={handleClose}>弹窗里面关闭</div>
  </Dialog>
</main>

<style lang="scss" src="./App.scss" module></style>
