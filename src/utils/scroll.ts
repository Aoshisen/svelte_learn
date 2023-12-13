function scroll(enable: boolean = false) {
  const overflow = enable ? "" : "hidden";
  document.body.style.overflow = overflow;
}
export function disableScroll() {
  scroll(false);
}
export function enableScroll() {
  scroll(true);
}
