<script lang="ts">
  import FloatingInput from "./FloatingInput.svelte";
  import { type Measurement, type Size } from "./measurements";

  type Props = {
    measurement: Measurement;
    size: Size;
    value?: number | null;
    manualAllowance?: number | null;
  };
  let { measurement, size, value = $bindable(), manualAllowance = $bindable() }: Props = $props();

  const allowance = $derived.by(() => {
    switch (measurement.allowanceType) {
      case "none":
        return 0;
      case "manual":
        return manualAllowance || 0;
      case "table":
        return parseFloat(measurement.allowance({ size }).toFixed(2));
    }
  });
</script>

<tr>
  <td>
    <FloatingInput class="input" label={measurement.name} type="number" size={4} bind:value />
  </td>
  <td>
    {#if measurement.allowanceType === "manual"}
      <input class="input" type="number" size="4" bind:value={manualAllowance} />
    {:else if measurement.allowanceType === "table"}
      <span>{allowance}</span>
    {/if}
  </td>
  <td>{value && value + allowance}</td>
  <td>{value && (measurement.divideByTwo ? (value + allowance) / 2 : value + allowance)}</td>
</tr>

<style>
  td {
    vertical-align: middle;
  }
</style>
