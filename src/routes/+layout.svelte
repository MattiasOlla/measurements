<script>
  import { page } from "$app/stores";
  import { signIn, signOut } from "@auth/sveltekit/client";
  import "sakura.css";

  let { children } = $props();

  const user = $derived($page?.data?.session?.user);
</script>

<div class="app">
  <main>
    <div class="topbar">
      {#if user}
        <strong>{user?.givenName ?? user?.givenName ?? "User"}</strong>
        {#if user?.image}
          <div class="avatar">
            <img src={user.image} class="avatar" alt="User Avatar" />
          </div>
        {/if}
        <button onclick={() => signOut()}>Sign out</button>
      {:else}
        <span>You are not signed in</span>
        <button onclick={() => signIn("google")}>Sign In with Google</button>
      {/if}
    </div>

    {@render children()}
  </main>
</div>

<style>
  .topbar {
    position: relative;
    display: flex;
    flex-wrap: nowrap;
    justify-content: flex-end;
  }
  .avatar {
    width: 50px;
    height: 50px;
  }
  .avatar img {
    position: absolute;
    top: 0px;
    right: 0px;
    width: 50px;
    height: 50px;
  }
</style>
