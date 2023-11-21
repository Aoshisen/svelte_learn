<script lang="ts">
  import { count } from "@store";
  import axios from "@api";
  const handleClick = () => {
    count.increment();
    axios.post("/api/customers");
  };
</script>

<button on:click={handleClick} class="button"> Clicks:{$count.age} </button>

<style lang="scss" src="./counter.scss" module></style>
