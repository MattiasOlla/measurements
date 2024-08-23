<script lang="ts">
  import { globalState } from "$lib/state.svelte";
  let { data } = $props();

  globalState.pageTitle = "Mina projekt";

  console.log({ data });
</script>

{#if data.projects?.length}
  {#each data.projects as project}
    <a href={`/${project.slug}`}>
      <article>
        <header><h2>{project.name}</h2></header>
        Senast updaterad {project.updated.toLocaleString()}
      </article>
    </a>
  {/each}
{:else}
  Du har inga projekt. <a href="/projects/new">Skapa ett här</a>
{/if}

<style>
  article {
    transition: box-shadow 250ms;
    transition: transform 250ms;
  }

  article:hover {
    transform: scale(1.02) perspective(0px);
    box-shadow: 0 0 11px rgba(33, 33, 33, 0.2);
  }

  a {
    color: inherit;
    text-decoration: none;
  }
</style>
