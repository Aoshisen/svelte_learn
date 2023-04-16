<script lang="ts">
  import { Counter } from "./components";

  import imgUrl from "../src/assets/svelte.png";
  export let message = "hello";
</script>

<main>
  <img src={imgUrl} alt="" />

  <h1>{message}</h1>
  <Counter />
</main>
