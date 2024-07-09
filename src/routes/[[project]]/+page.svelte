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

<!-- <script lang="ts">
  import { goto } from "$app/navigation";
  import { base } from "$app/paths";
  import { createNewProject } from "$lib/storage";
  const { data } = $props();
  const projects = Object.values(data.projects || {}).sort(
    (p1, p2) => Date.parse(p2.created) - Date.parse(p1.created),
  );

  let newProjectName = $state("");

  function addProject() {
    const project = createNewProject(newProjectName);
    goto(`${base}/project?name=${project.slug}`);
  }
</script>

<h1>Mina projekt</h1>

<ul>
  {#each projects as project}
    <li>
      <a href={`${base}/project?name=${project.slug}`}>{project.name}</a>
    </li>
  {/each}
</ul>

<input type="text" placeholder="Nytt projekt" bind:value={newProjectName} />
<button onclick={() => addProject()}>Lägg till</button> -->
