<script lang="ts">
  import Row from "$lib/Row.svelte";
  import { measurements, sizes, type Size } from "$lib/measurements.js";

  const { data } = $props();

  let projectName = $state(data.name || "");
  let size = $state<Size>(12);
</script>

<section>
  <h1>{projectName}</h1>
  <a href="./">Tillbaka</a>

  <label for="size">Storlek</label>
  <select id="size" bind:value={size}>
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
        <Row {measurement} {size} />
      {/each}
    </tbody>
  </table>
</section>
