<script lang="ts">
  import { replaceState } from "$app/navigation";
  import { page } from "$app/stores";
  import DerivedMeasurementRow from "$lib/DerivedMeasurementRow.svelte";
  import MeasurementRow from "$lib/MeasurementRow.svelte";
  import EditModal from "$lib/components/EditModal.svelte";
  import { debounce } from "$lib/debounce.js";
  import {
    derivedMeasurements,
    type DerivedMeasurementOutputRecord,
  } from "$lib/derived-measurements.js";
  import { eases, measurements, type MeasurementOutputRecord } from "$lib/measurements.js";
  import { assertProjectFields, changeName, saveProject, type Project } from "$lib/projects.js";
  import { globalState } from "$lib/state.svelte.js";
  import { downloadResponse } from "$lib/utils.js";

  const { data } = $props();
  let project = $state(assertProjectFields(data.activeProject || { name: "Nytt projekt" }));

  let changeNameModal: EditModal;

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

  $effect(() => {
    globalState.pageTitle = project.name;
  });
</script>

<div>
  <section class="options">
    <div>
      <label for="ease">Rörelsevidd</label>
      <select id="ease" bind:value={project.ease}>
        {#each eases as s (s)}
          <option value={s} selected={s === project.ease}>{s}</option>
        {/each}
      </select>
    </div>
    <div>
      <label for="size">Storlek</label>
      <input id="size" type="number" size="3" bind:value={project.size} />
    </div>
    {#if $page?.data?.session?.user}
      <details class="dropdown">
        <summary>Mer</summary>
        <ul>
          <li>
            <!-- svelte-ignore a11y_invalid_attribute -->
            <a href="javascript:void(0)" onclick={() => changeNameModal.open()}>Byt namn</a>
          </li>
        </ul>
      </details>
    {/if}
  </section>

  <section>
    <table>
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
  </section>
  <section class="options"><button onclick={downloadPDF}>Exportera som PDF</button></section>
</div>

<EditModal
  initialValue={project.name}
  label="Byt namn"
  bind:this={changeNameModal}
  onUpdate={async (newName) => {
    const updated = changeName(project, newName);
    await saveProject(updated);
    replaceState(`/${updated.slug}`, $page.state);
  }}
/>

<style>
  .options {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    gap: 1em;
    align-items: flex-end;
  }

  .options label {
    font-size: 14px;
  }

  details.dropdown summary + ul {
    left: unset;
    right: 0;
  }

  table {
    display: block;
    max-width: -moz-fit-content;
    max-width: fit-content;
    margin: 0 auto;
    overflow-x: auto;
    white-space: nowrap;
  }
</style>
