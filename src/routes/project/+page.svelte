<script lang="ts">
  import Row from "$lib/Row.svelte";
  import { measurements, sizes, type Size } from "$lib/measurements.js";

  const { data } = $props();
  const project = $state(data.project);
</script>

{#if project}
  <section>
    <h1>{project.name}</h1>
    <a href="./">Tillbaka</a>

    <label for="size">Storlek</label>
    <select id="size" bind:value={project.size}>
      {#each sizes as s}
        <option value={s}>{s}</option>
      {/each}
    </select>
  </section>

  <section>
    <table>
      <thead>
        <tr>
          <th></th>
          <th>Kroppsmått</th>
          <th>+/-</th>
          <th>Inkl. rörelsevidd</th>
          <th>Konstr. mått</th>
        </tr>
      </thead>
      <tbody>
        {#each measurements as measurement}
          <Row {measurement} size={project.size as Size} />
          <!-- initialValue={project.fields?.[measurement.name]?.value}
          initialManualAllowance={project.fields?.[measurement.name]?.manualAllowance}
          onUpdate={(value, allowance) => {
            console.log({ name: measurement.name, value, allowance });
            project.fields = {
              ...project.fields,
              [measurement.name]: { value, manualAllowance: allowance },
            };
            saveProject(project);
          }} -->
        {/each}
      </tbody>
    </table>
  </section>
{/if}
