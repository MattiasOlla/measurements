<script lang="ts">
  import { safeCalc } from "$lib/utils";
  import type { HTMLInputAttributes } from "svelte/elements";
  type Props = Omit<HTMLInputAttributes, "type" | "inputmode" | "value"> & {
    value?: number | null;
    label: string;
  };

  let { label, value = $bindable(), ...props }: Props = $props();

  let strValue = $state((value ?? "").toString());

  $effect(() => {
    if (!strValue) {
      value = null;
      return;
    }
    const calculated = safeCalc(strValue);
    if (calculated !== null) value = calculated;
  });
</script>

<div class="input-wrapper">
  <input
    bind:value={strValue}
    placeholder={label}
    type="text"
    inputmode="numeric"
    onblur={() => {
      strValue = (value ?? "").toString();
      console.log("onblur");
    }}
    {...props}
  />
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
    margin: 0;
    padding: 0.5rem;
    height: 2.5rem;
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
    transform: translateY(-85%) scale(0.75);
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
    background-color: var(--pico-background-color);
    margin: 0;
  }
</style>
