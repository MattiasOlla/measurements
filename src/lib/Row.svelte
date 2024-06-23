<script lang="ts">
  let { name } = $props();

  let value = $state<number | null>(null);
  let margin = $state<number | null>(null);

  $effect(() => {
    console.log(`The value of ${name} is ${value} with margin ${margin}`);
  });
</script>

<tr>
  <td>{name}</td>
  <td><input type="number" size="4" bind:value /> </td>
  <td><input type="number" size="4" bind:value={margin} /> </td>
  <td>{value && margin && value + margin}</td>
  <td>{value && margin && (value + margin) / 2}</td>
</tr>

<style>
  /* Chrome, Safari, Edge, Opera */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type="number"] {
    -moz-appearance: textfield;
  }
</style>
