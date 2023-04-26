<script lang="ts">
  import { Counter } from "@components";
  export let message = "hello";
</script>

<main>
  <h1>{message}</h1>
  <Counter />

  <div class="grid">
    <div class="item">1</div>
    <div class="item">2</div>
    <div class="item">3</div>
    <div class="item">4</div>
  </div>
</main>

<style lang="scss" src="./App.scss"></style>
