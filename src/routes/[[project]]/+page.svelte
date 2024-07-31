<script lang="ts">
  import { replaceState } from "$app/navigation";
  import { page } from "$app/stores";
  import EditableTitle from "$lib/EditableTitle.svelte";
  import Row from "$lib/Row.svelte";
  import { debounce } from "$lib/debounce.js";
  import { measurements, sizes, type Size } from "$lib/measurements.js";
  import { assertProjectFields, changeName, type Project } from "$lib/storage";

  const { data } = $props();
  let project = $state(
    assertProjectFields(data.activeProject || { name: "Untitled", size: 12 as Size }),
  );

  const saveProject = async (project: Project) => {
    return await fetch("/api/projects", {
      method: "PUT",
      body: JSON.stringify(project),
      headers: { "content-type": "application/json" },
    })
      .then((resp) => resp.json())
      .catch(console.error);
  };

  const autoSave = debounce(async (proj: Project) => {
    if (!$page?.data?.session?.user || !data.activeProject) return;
    await saveProject(proj);
  }, 1000);

  $effect(() => autoSave($state.snapshot(project)));
</script>

<section class="px-2 py-1">
  <EditableTitle
    bind:title={project.name}
    editable={!!$page?.data?.session?.user}
    onUpdate={async (newTitle) => {
      const updated = changeName(project, newTitle);
      console.log(updated);
      await saveProject(updated);
      project = updated;
      replaceState(`/${updated.slug}`, $page.state);
    }}
  />

  <label class="label" for="size">Storlek</label>
  <div class="select is-rounded">
    <select id="size" bind:value={project.size}>
      {#each sizes as s}
        <option value={s} selected={s === project.size}>{s}</option>
      {/each}
    </select>
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
        size={project.size}
        bind:value={project.fields[measurement.name].value}
        bind:manualAllowance={project.fields[measurement.name].manualAllowance}
      />
    {/each}
  </tbody>
</table>
