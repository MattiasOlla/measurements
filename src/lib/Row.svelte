<script lang="ts">
  import { measurements, type Measurement, type MeasurementNames, type Size } from "./measurements";

  let { name, size }: { name: MeasurementNames; size: Size } = $props();
  const measurementConfig: Measurement = measurements.find((m) => m.name === name)!;

  let value = $state<number | null>(null);
  let manualMargin = $state<number>(0);

  const valueWithMargin = $derived.by(() => {
    if (value === null) return null;
    switch (measurementConfig.allowance) {
      case "none":
        return value;
      case "manual":
        return value + manualMargin;
      case "table":
        return value + measurementConfig.range({ size });
    }
  });
</script>

<tr>
  <td>{name}</td>
  <td><input type="number" size="4" bind:value /> </td>
  {#if measurementConfig.allowance === "manual"}
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
