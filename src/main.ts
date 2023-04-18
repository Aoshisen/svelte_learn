/// <reference types="svelte" />
/// <reference types="vite/client" />

import App from "./App.svelte";

const app = new App({
  target: document.getElementById("app") as HTMLDivElement,
  props:{
    message:"this is a custom Message In App"
  }
});

export default app;
