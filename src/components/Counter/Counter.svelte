<script lang="ts">
  const handleClick = () => {
    console.log("click");
  };
  export let increment = () => {};

  export let counter = { value: 0 };
</script>

<button on:click={increment}> Clicks:{counter.value} </button>

<style lang="scss" src="./Counter.scss"></style>
