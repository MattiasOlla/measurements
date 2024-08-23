<script lang="ts">
  import { clickOutside } from "$lib/actions/click-outside";

  type Props = {
    initialValue: string;
    label: string;
    onUpdate: (value: string) => Promise<void>;
  };

  let { initialValue, label, onUpdate }: Props = $props();

  let dialog: HTMLDialogElement;
  let newValue = $state("");

  export const open = () => dialog.showModal();
  export const close = () => dialog.close();

  const saveAndClose = async (event: MouseEvent) => {
    event.preventDefault();
    const val = $state.snapshot(newValue);
    newValue = "";
    dialog.close();
    await onUpdate(val);
  };
</script>

<dialog bind:this={dialog} use:clickOutside={close}>
  <article>
    <header>
      <button aria-label="Close" rel="prev" onclick={close}></button>
      <p>
        <strong>{label}</strong>
      </p>
    </header>
    <input bind:value={newValue} placeholder={initialValue} />
    <footer>
      <button onclick={saveAndClose}>Spara</button>
    </footer>
  </article>
</dialog>

<style>
  dialog {
    box-shadow: 5px 10px #888888;
    border-radius: 8px;
    border: none;
  }

  dialog button {
    margin-right: 0;
    margin-left: auto;
    display: block;
  }
</style>
