<script lang="ts">
  import { type Measurement, type Size } from "./measurements";

  let { measurement, size }: { measurement: Measurement; size: Size } = $props();

  let value = $state<number | null>(null);
  let manualAllowance = $state<number>(0);

  const allowance = $derived.by(() => {
    switch (measurement.allowanceType) {
      case "none":
        return 0;
      case "manual":
        return manualAllowance;
      case "table":
        return measurement.allowance({ size });
    }
  });
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
