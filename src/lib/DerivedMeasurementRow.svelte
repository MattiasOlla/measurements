<script lang="ts">
  import type { DerivedMeasurement } from "./derived-measurements";
  import { type Ease, type MeasurementOutputRecord } from "./measurements";
  import { toFixed } from "./utils";

  type Props = {
    derivedMeasurement: DerivedMeasurement;
    ease: Ease;
    size: number;
    measurementOutputs: MeasurementOutputRecord;
  };
  let { derivedMeasurement, ease, size, measurementOutputs }: Props = $props();

  // TODO size
  let allowance = $derived(
    toFixed(derivedMeasurement.allowance({ ease, measurementOutputs, size })),
  );
</script>

<tr>
  <td> {derivedMeasurement.name} </td>
  <td></td>
  <td></td>
  <td>{allowance}</td>
</tr>

<style>
  td {
    vertical-align: middle;
  }
</style>
