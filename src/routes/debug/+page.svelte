<script lang="ts">
  import { globalState } from "$lib/state.svelte";

  const { data } = $props();
  const { projects } = data;

  globalState.pageTitle = "Debug-vy";
</script>

<section>
  <code>
    {JSON.stringify({ projects }, null, 2)}
  </code>
</section>

<style>
  code {
    display: block;
    white-space: pre-wrap;
    padding: 0.5rem;
  }
</style>
