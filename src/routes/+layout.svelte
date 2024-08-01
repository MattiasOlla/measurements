<script lang="ts">
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import logo from "$lib/images/tapemeasure.png";
  import type { Ease } from "$lib/measurements";
  import { assertProjectFields, saveProject } from "$lib/projects.js";
  import { signIn, signOut } from "@auth/sveltekit/client";
  import "../app.css";

  let { children, data } = $props();

  const user = $derived($page?.data?.session?.user);

  let burgerMenuOpen = $state(false);

  const newProject = async () => {
    const existingProjectNames = new Set((data.projects || []).map(({ name }) => name));
    let name: string;
    let newProjectNum = 0;
    do {
      name = newProjectNum ? `Nytt projekt ${newProjectNum}` : "Nytt projekt";
      newProjectNum++;
    } while (existingProjectNames.has(name));

    const proj = assertProjectFields({ name, ease: 12 as Ease });
    await saveProject(proj);
    goto(`/${proj.slug}`);
    burgerMenuOpen = false;
  };
</script>

<div>
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
        {#if user}
          <div class="navbar-item has-dropdown is-hoverable">
            <div class="navbar-link">Mina projekt</div>

            <div class="navbar-dropdown">
              {#each data.projects || [] as project}
                <a class="navbar-item" href={`/${project.slug}`}>{project.name}</a>
              {/each}
              <hr class="navbar-divider" />
              <div class="navbar-item">
                <button class="button is-small" onclick={newProject}>Nytt projekt</button>
              </div>
            </div>
          </div>
        {/if}
      </div>
      <div class="navbar-end">
        {#if user}
          <div class="navbar-item has-dropdown is-hoverable">
            <strong class="navbar-item">{user?.givenName ?? user?.givenName ?? "User"}</strong>
            {#if user?.image}
              <div class="navbar-item avatar">
                <img src={user.image} class="avatar" alt="User Avatar" />
              </div>
            {/if}

            <div class="navbar-dropdown">
              <div class="navbar-item">
                <button class="button" onclick={() => signOut()}>Logga ut</button>
              </div>
            </div>
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
