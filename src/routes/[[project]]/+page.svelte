<script lang="ts">
  import { page } from "$app/stores";
  import Row from "$lib/Row.svelte";
  import { debounce } from "$lib/debounce.js";
  import { measurements, sizes, type Size } from "$lib/measurements.js";
  import { assertProjectFields } from "$lib/storage";

  const { data } = $props();
  const project = $state(
    assertProjectFields(data.activeProject || { name: "Untitled", size: 12 as Size }),
  );

  const save = debounce(async (proj) => {
    if (!$page?.data?.session?.user) {
      console.log("not logged in, not saving");
      return;
    }
    console.log("saving", proj);

    await fetch("/api/projects", {
      method: "PUT",
      body: JSON.stringify(proj),
      headers: { "content-type": "application/json" },
    })
      .then((resp) => resp.json())
      .then((data) => console.log("Received response", data))
      .catch(console.error);
  }, 1000);

  $effect(() => save($state.snapshot(project)));
</script>

<h1 class="title">{data?.activeProject?.name || "Namnlöst projekt"}</h1>

<section class="section">
  <label class="label" for="size">Storlek</label>
  <div class="select is-rounded">
    <select id="size" bind:value={project.size}>
      {#each sizes as s}
        <option value={s} selected={s === project.size}>{s}</option>
      {/each}
    </select>
  </div>
</section>

<section class="section">
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
</section>
