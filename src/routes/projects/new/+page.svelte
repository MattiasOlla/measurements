<script lang="ts">
  import { goto } from "$app/navigation";
  import { assertProjectFields, saveProject } from "$lib/projects";
  import { globalState } from "$lib/state.svelte";

  let { data } = $props();

  globalState.pageTitle = "Nytt projekt";

  function getUnusedProjectName() {
    const existingProjectNames = new Set((data.projects || []).map(({ name }) => name));
    let name: string;
    let newProjectNum = 0;
    do {
      name = newProjectNum ? `Nytt projekt ${newProjectNum}` : "Nytt projekt";
      newProjectNum++;
    } while (existingProjectNames.has(name));
    return name;
  }

  let projectName = $state(getUnusedProjectName());

  async function newProject() {
    const proj = assertProjectFields({ name: projectName });
    await saveProject(proj);
    goto(`/${proj.slug}`);
  }
</script>

<section>
  <div>
    <label for="newprojectname">Namn</label>
    <input bind:value={projectName} id="newprojectname" />
  </div>

  <button onclick={newProject}>Skapa</button>
</section>
