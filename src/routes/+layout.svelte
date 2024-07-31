<script>
  import { page } from "$app/stores";
  import logo from "$lib/images/tapemeasure.png";
  import { signIn, signOut } from "@auth/sveltekit/client";
  import "../app.css";

  let { children, data } = $props();

  const user = $derived($page?.data?.session?.user);

  let burgerMenuOpen = $state(false);
</script>

<div class="container is-widescreen">
  <nav class="navbar" aria-label="main navigation">
    <div class="navbar-brand">
      <img src={logo} alt="tape measure" />

      <button
        class="navbar-burger"
        class:is-active={burgerMenuOpen}
        aria-label="menu"
        aria-expanded="false"
        data-target="navbar"
        onclick={() => {
          burgerMenuOpen = !burgerMenuOpen;
        }}
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </button>
    </div>

    <div id="navbar" class="navbar-menu" class:is-active={burgerMenuOpen}>
      <div class="navbar-start">
        {#if user && data.projects}
          <div class="navbar-dropdown">
            {#each data.projects as project}
              <a href={`/${project.slug}`}>{project.name}</a>
            {/each}
          </div>
        {/if}
      </div>
      <div class="navbar-end">
        {#if user}
          <strong class="navbar-item">{user?.givenName ?? user?.givenName ?? "User"}</strong>
          {#if user?.image}
            <div class="navbar-item avatar">
              <img src={user.image} class="avatar" alt="User Avatar" />
            </div>
          {/if}
          <div class="navbar-item">
            <button class="button" onclick={() => signOut()}>Logga ut</button>
          </div>
        {:else}
          <div class="navbar-item">
            <button class="button" onclick={() => signIn("google")}>Logga in</button>
          </div>
        {/if}
      </div>
    </div>
  </nav>

  <main>
    {@render children()}
  </main>
</div>
