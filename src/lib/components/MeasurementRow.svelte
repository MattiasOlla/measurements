<script lang="ts">
  import { type Ease, type Measurement, type MeasurementOutput } from "../measurements";
  import { toFixed } from "../utils";
  import FloatingCalculatorInput from "./FloatingCalculatorInput.svelte";

  type Props = {
    measurement: Measurement;
    ease: Ease;
    isLongSleeve: boolean;
    value?: number | null;
    manualAllowance?: number | null;
    outputs: MeasurementOutput;
  };
  let {
    measurement,
    ease,
    isLongSleeve = false,
    value = $bindable(),
    manualAllowance = $bindable(),
    outputs = $bindable(),
  }: Props = $props();

  const allowance = $derived.by(() => {
    if (ease === 0) return 0;
    switch (measurement.allowanceType) {
      case "none":
        return 0;
      case "manual":
        return manualAllowance || 0;
      case "table":
        return measurement.allowance({ ease, isLongSleeve });
    }
  });

  $effect(() => {
    if (value === null || value === undefined) {
      outputs = {};
      return;
    }
    const withEase = toFixed(value + allowance);
    const withEaseHalved = toFixed((value + allowance) / 2);
    outputs = {
      base: value,
      allowance,
      withEase,
      withEaseHalved,
      constructionMeasurement: measurement.divideByTwo ? withEaseHalved : withEase,
    };
  });
</script>

<tr>
  <td>
    <FloatingCalculatorInput label={measurement.name} size={4} bind:value />
  </td>
  <td>
    {#if ease === 0}
      <span>0</span>
    {:else if measurement.allowanceType === "manual"}
      <input type="number" size="2" bind:value={manualAllowance} />
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
    padding: 0.5rem;
  }

  input {
    display: inline;
    width: 100%;
    margin: 0;
    height: 2.5rem;
  }
</style>
