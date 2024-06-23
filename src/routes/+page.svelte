<script lang="ts">
  import { goto } from "$app/navigation";
  import { createNewProject } from "$lib/storage";

  const { data } = $props();
  const projects = Object.values(data.projects || {}).sort(
    (p1, p2) => Date.parse(p2.created) - Date.parse(p1.created),
  );

  let newProjectName = $state("");

  function addProject() {
    const project = createNewProject(newProjectName);
    goto(`./${project.slug}`);
  }
</script>

<h1>Mina projekt</h1>

<ul>
  {#each projects as project}
    <li>
      <a href={`./${project.slug}`}>{project.name}</a>
    </li>
  {/each}
</ul>

<input type="text" placeholder="Nytt projekt" bind:value={newProjectName} />
<button onclick={() => addProject()}>Lägg till</button>
