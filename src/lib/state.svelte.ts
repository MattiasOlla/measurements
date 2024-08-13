let pageTitle = $state("");

export const globalState = {
  get pageTitle() {
    return pageTitle;
  },
  set pageTitle(val: string) {
    pageTitle = val;
  },
};
