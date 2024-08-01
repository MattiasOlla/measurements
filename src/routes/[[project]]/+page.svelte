<script lang="ts">
  import { replaceState } from "$app/navigation";
  import { page } from "$app/stores";
  import EditableTitle from "$lib/EditableTitle.svelte";
  import Row from "$lib/Row.svelte";
  import { debounce } from "$lib/debounce.js";
  import { eases, measurements, type Ease } from "$lib/measurements.js";
  import { assertProjectFields, changeName, saveProject, type Project } from "$lib/projects.js";

  const { data } = $props();
  let project = $state(
    assertProjectFields(data.activeProject || { name: "Nytt projekt", ease: 12 as Ease }),
  );
  $effect(() => {
    if (data.activeProject) project = data.activeProject;
  });

  const autoSave = debounce(async (proj: Project) => {
    if (!$page?.data?.session?.user || !data.activeProject) return;
    await saveProject(proj);
  }, 1000);

  $effect(() => autoSave($state.snapshot(project)));
</script>

<div>
  <section class="px-2 py-1">
    <div class="columns">
      <div class="column is-two-thirds">
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
      <div class="column">
        <div class="is-pulled-right">
          <label class="label" for="size">Rörelsevidd</label>
          <div class="select is-small is-pulled-right">
            <select id="size" bind:value={project.ease}>
              {#each eases as s}
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
      {#each measurements as measurement}
        <Row
          {measurement}
          ease={project.ease}
          bind:value={project.fields[measurement.name].value}
          bind:manualAllowance={project.fields[measurement.name].manualAllowance}
        />
      {/each}
    </tbody>
  </table>
</div>
