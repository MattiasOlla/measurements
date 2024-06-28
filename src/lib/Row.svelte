<script lang="ts">
  import { type Measurement, type Size } from "./measurements";

  let { measurement, size }: { measurement: Measurement; size: Size } = $props();

  let value = $state<number | null>(null);
  let manualMargin = $state<number>(0);

  const valueWithMargin = $derived.by(() => {
    if (value === null) return null;
    switch (measurement.allowance) {
      case "none":
        return value;
      case "manual":
        return value + manualMargin;
      case "table":
        return value + measurement.range({ size });
    }
  });
</script>

<tr>
  <td>{measurement.name}</td>
  <td><input type="number" size="4" bind:value /> </td>
  {#if measurement.allowance === "manual"}
    <td><input type="number" size="4" bind:value={manualMargin} /> </td>
  {:else}
    <td></td>
  {/if}
  <td>{valueWithMargin}</td>
  <td>{valueWithMargin && valueWithMargin / 2}</td>
</tr>

<style>
  /* Chrome, Safari, Edge, Opera */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type="number"] {
    -moz-appearance: textfield;
  }
</style>
