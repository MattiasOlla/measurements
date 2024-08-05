<script lang="ts">
  import FloatingInput from "./FloatingInput.svelte";
  import { type Ease, type Measurement, type MeasurementOutput } from "./measurements";
  import { toFixed } from "./utils";

  type Props = {
    measurement: Measurement;
    ease: Ease;
    value?: number | null;
    manualAllowance?: number | null;
    outputs: MeasurementOutput;
  };
  let {
    measurement,
    ease,
    value = $bindable(),
    manualAllowance = $bindable(),
    outputs = $bindable(),
  }: Props = $props();

  const allowance = $derived.by(() => {
    switch (measurement.allowanceType) {
      case "none":
        return 0;
      case "manual":
        return manualAllowance || 0;
      case "table":
        return measurement.allowance({ ease });
    }
  });

  $effect(() => {
    if (value) {
      const withEase = toFixed(value + allowance);
      const withEaseHalved = toFixed((value + allowance) / 2);
      outputs = {
        base: value,
        allowance,
        withEase,
        withEaseHalved,
        constructionMeasurement: measurement.divideByTwo ? withEaseHalved : withEase,
      };
    }
  });
</script>

<tr>
  <td>
    <FloatingInput class="input" label={measurement.name} size={4} bind:value />
  </td>
  <td>
    {#if measurement.allowanceType === "manual"}
      <input class="input" type="number" size="4" bind:value={manualAllowance} />
    {:else if measurement.allowanceType === "table"}
      <span>{allowance}</span>
    {/if}
  </td>
  <td>{outputs.withEase}</td>
  <td>{outputs.constructionMeasurement}</td>
</tr>

<style>
  td {
    vertical-align: middle;
  }
</style>
