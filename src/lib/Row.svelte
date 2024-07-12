<script lang="ts">
  import { type Measurement, type Size } from "./measurements";

  type Props = {
    measurement: Measurement;
    size: Size;
    // initialValue?: number;
    // initialManualAllowance?: number;
    value?: number;
    manualAllowance?: number;
    onUpdate: (value?: number, allowance?: number) => void;
  };
  let {
    measurement,
    size,
    value = $bindable(),
    manualAllowance = $bindable(0),
    onUpdate,
  }: Props = $props();

  // let value = $state<number | undefined>(initialValue);
  // let manualAllowance = $state<number>(initialManualAllowance || 0);

  const allowance = $derived.by(() => {
    switch (measurement.allowanceType) {
      case "none":
        return 0;
      case "manual":
        return manualAllowance;
      case "table":
        return parseFloat(measurement.allowance({ size }).toFixed(2));
    }
  });

  $effect(() => onUpdate(value, manualAllowance || undefined));
</script>

<tr>
  <td>{measurement.name}</td>
  <td><input type="number" size="4" bind:value /> </td>
  <td>
    {#if measurement.allowanceType === "manual"}
      <input type="number" size="4" bind:value={manualAllowance} />
    {:else if measurement.allowanceType === "table"}
      {allowance}
    {/if}
  </td>
  <td>{value && value + allowance}</td>
  <td>{value && (value + allowance) / 2}</td>
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
