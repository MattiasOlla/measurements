<script lang="ts">
  import edit from "$lib/images/edit.svg";
  type Props = { title: string; editable: boolean; onUpdate: (title: string) => Promise<void> };

  let { title = $bindable(), editable, onUpdate }: Props = $props();

  let dialog: HTMLDialogElement;
  let newTitle = $state("");
</script>

<h1 class="title">
  {title}
  {#if editable}
    <button
      onclick={() => {
        dialog && dialog.showModal();
      }}
    >
      <img src={edit} alt="Edit name" />
    </button>
  {/if}
</h1>

<dialog bind:this={dialog}>
  <div class="modal is-active">
    <div class="modal-content">
      <div class="box">
        <h4 class="title is-4">Byt namn</h4>
        <input class="input" bind:value={newTitle} placeholder={title} />
        <button
          class="button mt-3"
          onclick={async () => {
            await onUpdate(newTitle);
            dialog.close();
          }}>Spara</button
        >
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
