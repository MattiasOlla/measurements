<script lang="ts">
  const { data } = $props();
  const { projects } = data;
</script>

<section class="section">
  <pre>
    {JSON.stringify({ projects }, null, 2)}
  </pre>
</section>
