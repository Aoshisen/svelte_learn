<script lang="ts">
  import { Modal } from "@components";
  import { getModal, Modal as ModalType } from "@components/Modal/modal.svelte";

  import { onMount } from "svelte";
  export let message = "hello";

  let modal: ModalType;

  onMount(() => {
    modal = getModal();
  });

  function closeCallback() {
    console.log("closeCallback");
  }

  function handleOpen() {
    modal.open(closeCallback);
  }

  function handleClose() {
    modal.close();
  }
  console.log(import.meta.env.VITE_APP_ENV, "app_env in code");
</script>

<main>
  <h1>{message}</h1>
  <button on:click={handleOpen}>add Modal</button>
  <button on:click={handleClose}>close</button>
  <!-- <Counter />

  <div class="grid">
    <div class="item">1</div>
    <div class="item">2</div>
    <div class="item">3</div>
    <div class="item">4</div>
  </div> -->

  <Modal>
    <div on:click={handleClose}>弹窗里面关闭</div>
  </Modal>
</main>

<style lang="scss" src="./App.scss"></style>
