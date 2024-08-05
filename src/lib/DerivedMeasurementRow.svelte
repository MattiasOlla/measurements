<script lang="ts">
  import type { DerivedMeasurement, DerivedMeasurementOutput } from "./derived-measurements";
  import { type Ease, type MeasurementOutputRecord } from "./measurements";
  import { toFixed } from "./utils";

  type Props = {
    derivedMeasurement: DerivedMeasurement;
    ease: Ease;
    size: number;
    measurementOutputs: MeasurementOutputRecord;
    outputs: DerivedMeasurementOutput;
  };
  let {
    derivedMeasurement,
    ease,
    size,
    measurementOutputs,
    outputs = $bindable(),
  }: Props = $props();

  let constructionMeasurement = $derived(
    toFixed(derivedMeasurement.constructionMeasurement({ ease, measurementOutputs, size })),
  );

  $effect(() => {
    if (constructionMeasurement) {
      outputs = { constructionMeasurement };
    }
  });
</script>

<tr>
  <td> {derivedMeasurement.name} </td>
  <td></td>
  <td></td>
  <td>{constructionMeasurement}</td>
</tr>

<style>
  td {
    vertical-align: middle;
  }
</style>
