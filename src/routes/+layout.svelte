<script>
  import { page } from "$app/stores";
  import logo from "$lib/images/tapemeasure.png";
  import { signIn, signOut } from "@auth/sveltekit/client";
  import "../app.scss";

  let { children, data } = $props();

  const user = $derived($page?.data?.session?.user);
</script>

<div class="app">
  <div class="box">
    <nav class="navbar" aria-label="main navigation">
      <div class="navbar-brand">
        <img src={logo} alt="tape measure" />
        <div class="navbar-item">
          <h1 class="title">{data?.activeProject?.name || "Namnlöst projekt"}</h1>
        </div>
      </div>

      <div class="navbar-menu">
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
</div>
