import type { Action } from "svelte/action";

import _autosize from "autosize";

export const autosize: Action<HTMLElement> = (node) => {
  _autosize(node);

  return {
    update() {
      _autosize.update(node);
    },
    destroy() {
      _autosize.destroy(node);
    },
  };
};
