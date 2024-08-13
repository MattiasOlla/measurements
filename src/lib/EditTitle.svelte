<script lang="ts">
  type Props = { title: string; text: string; onUpdate: (title: string) => Promise<void> };

  let { title = $bindable(), text, onUpdate }: Props = $props();

  let dialog: HTMLDialogElement;
  let newTitle = $state("");
</script>

<button
  class="button is-small m-1"
  onclick={() => {
    dialog.showModal();
  }}
>
  {text}
</button>

<dialog bind:this={dialog}>
  <div class="modal is-active">
    <div class="modal-content">
      <div class="box">
        <h4 class="title is-4">Byt namn</h4>
        <form
          onsubmit={async (event) => {
            event.preventDefault();
            await onUpdate(newTitle);
            dialog.close();
            newTitle = "";
          }}
        >
          <input class="input" bind:value={newTitle} placeholder={title} />
          <button class="button mt-3" type="submit">Spara</button>
        </form>
      </div>
    </div>
    <form method="dialog">
      <button class="modal-close is-large" aria-label="close"></button>
    </form>
  </div>
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
