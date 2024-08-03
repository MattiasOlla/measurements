<script lang="ts">
  import type { HTMLInputAttributes } from "svelte/elements";
  type Props = Omit<HTMLInputAttributes, "type" | "value"> & {
    value?: number | null;
    label: string;
  };

  let { label, value = $bindable(), ...props }: Props = $props();
</script>

<div class="input-wrapper">
  <input bind:value placeholder={label} type="number" {...props} />
  <label for={props.id}>{label}</label>
</div>

<style>
  .input-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    min-width: 8rem;
  }

  input {
    display: inline;
    width: 100%;
  }

  input::placeholder {
    color: transparent;
  }

  input::-webkit-contacts-auto-fill-button {
    visibility: hidden;
    pointer-events: none;
    position: absolute;
  }

  input:focus + label,
  input:not(:placeholder-shown) + label {
    /* Move the label above the button and scale it down */
    transform: translateY(-75%) scale(0.75);
  }

  label {
    position: absolute;
    left: 0.3rem;
    display: inline-block;
    pointer-events: none;
    transform-origin: left center;
    transition: transform 250ms;
    opacity: 0.95;
    padding: 0 4px;
    border-radius: 4px;
    background-color: var(--bulma-body-background-color);
  }
</style>
