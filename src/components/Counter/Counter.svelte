<script lang="ts">
  import { count } from "@store";
  const handleClick = count.increment;
</script>

<button on:click={handleClick}> Clicks:{$count} </button>

<style lang="scss" src="./Counter.scss"></style>
