<script lang="ts">
  import { page } from "$app/stores";
  import Row from "$lib/Row.svelte";

  const { data } = $props();

  let projectName = $state(data.name || "");
  $effect(() => $page.url.searchParams.set("projectName", projectName));

  const rows = [
    "Ärmhålsdjup",
    "Livlängd, bak",
    "Klänningslängd",
    "Bystvidd",
    "Midjevidd",
    "Höftvidd",
    "Höftläge",
    "Stussvidd",
    "Stussläge",
    "Ryggbredd",
    "Halsvidd",
    "Axelbredd",
    "Ärmlängd",
    "Överarmsvidd",
    "Armbågdsidd",
    "Handledsvidd",
    "Bysthöjd",
    "Livlängd, fram",
    "Bystveck",
    "Ärmhål",
  ];
</script>

<section>
  <h1>{projectName}</h1>
  <a href="./">Tillbaka</a>
</section>

<section>
  <table>
    <thead>
      <tr>
        <th></th>
        <th>Kroppsmått</th>
        <th>+/-</th>
        <th>Inkl. rörelsevidd</th>
        <th>:2</th>
        <th>Konstr. mått</th>
      </tr>
    </thead>
    <tbody>
      {#each rows as row}
        <Row name={row} />
      {/each}
    </tbody>
  </table>
</section>
