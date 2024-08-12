<script lang="ts">
  import { replaceState } from "$app/navigation";
  import { page } from "$app/stores";
  import DerivedMeasurementRow from "$lib/DerivedMeasurementRow.svelte";
  import EditableTitle from "$lib/EditableTitle.svelte";
  import MeasurementRow from "$lib/MeasurementRow.svelte";
  import { debounce } from "$lib/debounce.js";
  import {
    derivedMeasurements,
    type DerivedMeasurementOutputRecord,
  } from "$lib/derived-measurements.js";
  import { eases, measurements, type MeasurementOutputRecord } from "$lib/measurements.js";
  import { assertProjectFields, changeName, saveProject, type Project } from "$lib/projects.js";
  import { downloadResponse } from "$lib/utils.js";

  const { data } = $props();
  let project = $state(assertProjectFields(data.activeProject || { name: "Nytt projekt" }));
  $effect(() => {
    if (data.activeProject) project = data.activeProject;
  });

  const measurementOutputs = $state(
    Object.fromEntries(measurements.map(({ name }) => [name, {}])) as MeasurementOutputRecord,
  );

  const derivedMeasurementOutputs = $state(
    Object.fromEntries(
      derivedMeasurements.map(({ name }) => [name, {}]),
    ) as DerivedMeasurementOutputRecord,
  );

  const autoSave = debounce(async (proj: Project) => {
    if (!$page?.data?.session?.user || !data.activeProject) return;
    await saveProject(proj);
  }, 1000);

  $effect(() => autoSave($state.snapshot(project)));

  async function downloadPDF() {
    const fullProject = {
      ...project,
      fields: [
        ...Object.entries(measurementOutputs).map(([name, values]) => ({ name, ...values })),
        ...Object.entries(derivedMeasurementOutputs).map(([name, values]) => ({ name, ...values })),
      ],
    };

    const response = await fetch("/api/pdf", {
      method: "POST",
      body: JSON.stringify(fullProject),
      headers: { "content-type": "application/json" },
    })
      .then((res) => res.blob())
      .catch(console.error);
    if (response) downloadResponse(response, "application/pdf", `${project.name}.pdf`);
  }
</script>

<div>
  <section class="px-2 py-1">
    <div class="columns">
      <div class="column is-half">
        {#if $page?.data?.session?.user}
          <EditableTitle
            bind:title={project.name}
            editable={!!$page?.data?.session?.user}
            onUpdate={async (newTitle) => {
              const updated = changeName(project, newTitle);
              await saveProject(updated);
              replaceState(`/${updated.slug}`, $page.state);
            }}
          />
        {:else}
          <i>Logga in för att spara dina mått</i>
        {/if}
      </div>
      <div class="column container">
        <div class="is-pulled-right px-3">
          <label class="label" for="size">Storlek</label>
          <input
            class="input is-small is-pulled-right"
            type="number"
            size="3"
            bind:value={project.size}
          />
        </div>
        <div class="is-pulled-right">
          <label class="label" for="ease">Rörelsevidd</label>
          <div class="select is-small is-pulled-right">
            <select id="ease" bind:value={project.ease}>
              {#each eases as s (s)}
                <option value={s} selected={s === project.ease}>{s}</option>
              {/each}
            </select>
          </div>
        </div>
      </div>
    </div>
  </section>

  <table class="table">
    <thead>
      <tr>
        <th>Kroppsmått</th>
        <th>+/-</th>
        <th>Inkl. rörelsevidd</th>
        <th>Konstr. mått</th>
      </tr>
    </thead>
    <tbody>
      {#each measurements as measurement (measurement.name)}
        <MeasurementRow
          {measurement}
          ease={project.ease}
          bind:value={project.fields[measurement.name].value}
          bind:manualAllowance={project.fields[measurement.name].manualAllowance}
          bind:outputs={measurementOutputs[measurement.name]}
        />
      {/each}
      {#each derivedMeasurements as derivedMeasurement (derivedMeasurement.name)}
        <DerivedMeasurementRow
          {derivedMeasurement}
          ease={project.ease}
          size={project.size}
          {measurementOutputs}
          bind:outputs={derivedMeasurementOutputs[derivedMeasurement.name]}
        />
      {/each}
    </tbody>
  </table>
  <button class="button my-2 is-pulled-right" onclick={downloadPDF}>Exportera som PDF</button>
</div>
