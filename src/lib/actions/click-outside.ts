import type { Action } from "svelte/action";

export const clickOutside: Action<HTMLElement, (el: Element) => void> = (node, callback) => {
  const handleClick = (event: MouseEvent) => {
    if (!node.contains(event.target as Element)) {
      callback(event.target as Element);
    }
  };

  document.addEventListener("click", handleClick, true);

  return {
    destroy() {
      document.removeEventListener("click", handleClick, true);
    },
  };
};
