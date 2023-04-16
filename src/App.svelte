<script lang="ts">
  import { Counter } from "./components";
  import { Provider } from "svelte-redux-connect";
  import store from "./store";
</script>

<Provider {store}>
  <Counter />
</Provider>
