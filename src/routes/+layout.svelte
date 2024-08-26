<script lang="ts">
  import { navigating, page } from "$app/stores";
  import Menu from "$lib/components/Menu.svelte";
  import logo from "$lib/images/tapemeasure.png";
  import { globalState } from "$lib/state.svelte";
  import { signIn } from "@auth/sveltekit/client";
  import "@picocss/pico/css/pico.min.css";
  import { Hamburger } from "svelte-hamburgers";
  import "../app.css";

  let { children } = $props();

  const user = $derived($page?.data?.session?.user);

  let burgerMenuOpen = $state(false);

  $effect(() => {
    if ($navigating) burgerMenuOpen = false;
  });
</script>

<div class="container">
  <nav aria-label="main navigation">
    <ul>
      <li><img src={logo} alt="tape measure" /></li>
      <li>
        {#if globalState.pageTitle}
          <h1>{globalState.pageTitle}</h1>
        {:else}
          <em><button onclick={() => signIn("google")}>Logga in</button> för att spara dina mått</em
          >
        {/if}
      </li>
    </ul>

    <ul>
      {#if user?.image}
        <li><img src={user.image} alt="User avatar" /></li>
      {/if}
      <li>
        <Hamburger bind:open={burgerMenuOpen} />
      </li>
    </ul>
  </nav>

  <Menu
    bind:open={burgerMenuOpen}
    userName={user?.givenName ?? user?.givenName}
    avatarUrl={user?.image}
  />

  <main>
    {@render children()}
  </main>
</div>

<style>
  h1 {
    align-items: center;
    margin: 0.2em;
  }

  img {
    max-height: 38px;
    max-width: 38px;
  }

  em button {
    padding: 0 0.3em;
  }
</style>
