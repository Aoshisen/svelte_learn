<script lang="ts">
  import { Counter } from "@components";

  import logo from "@assets/svelte.png";
  export let message = "hello";
</script>

<main>
  <img src={logo} alt="Svelte Logo" />
  <h1>{message}</h1>

  <Counter />
</main>

<style lang="scss" src="./App.scss"></style>
