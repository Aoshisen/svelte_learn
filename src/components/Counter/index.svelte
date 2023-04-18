<script lang="ts">
  import { count } from "@store";
  const handleClick = count.increment;
</script>

<button on:click={handleClick}> Clicks:{$count.age} </button>

<style lang="scss" src="./index.scss"></style>
