<script lang="ts">
  import FloatingInput from "./FloatingInput.svelte";
  import { type Ease, type Measurement } from "./measurements";

  type Props = {
    measurement: Measurement;
    ease: Ease;
    value?: number | null;
    manualAllowance?: number | null;
    results: {
      withEase: number | null;
      withEaseHalved: number | null;
    };
  };
  let {
    measurement,
    ease,
    value = $bindable(),
    manualAllowance = $bindable(),
    results = $bindable(),
  }: Props = $props();

  const allowance = $derived.by(() => {
    switch (measurement.allowanceType) {
      case "none":
        return 0;
      case "manual":
        return manualAllowance || 0;
      case "table":
        return parseFloat(measurement.allowance({ ease }).toFixed(2));
    }
  });

  $effect(() => {
    if (value) {
      results.withEase = value + allowance;
      results.withEaseHalved = results.withEase / 2;
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
  <td>{results.withEase}</td>
  <td>{measurement.divideByTwo ? results.withEaseHalved : results.withEase}</td>
</tr>

<style>
  td {
    vertical-align: middle;
  }
</style>
