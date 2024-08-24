<script lang="ts">
  import { clickOutside } from "$lib/actions/click-outside";
  import { signIn, signOut } from "@auth/sveltekit/client";

  type Props = {
    open: boolean;
    userName?: string;
    avatarUrl?: string;
  };

  let { open = $bindable(false), userName, avatarUrl }: Props = $props();

  const onClickOutside = (el: Element) => {
    // Hacky way to ignore clicks on the hamburger menu button,
    // which would otherwise toggle `open` and open it again
    if (!el.closest("button.hamburger")) {
      open = false;
    }
  };
</script>

{#if open}
  <div class="menu" use:clickOutside={onClickOutside}>
    {#if userName}
      <div class="menu-item">
        <strong>{userName}</strong>
        {#if avatarUrl}
          <div class="avatar">
            <img src={avatarUrl} class="avatar" alt="User Avatar" />
          </div>
        {/if}
      </div>

      <div class="menu-item"><a href="/projects">Mina projekt</a></div>
      <div class="menu-item"><a href="/projects/new">Nytt projekt</a></div>
    {/if}

    <div class="menu-item">
      {#if userName}
        <button onclick={() => signOut()}>Logga ut</button>
      {:else}
        <button onclick={() => signIn("google")}>Logga in</button>
      {/if}
    </div>
  </div>
{/if}

<style>
  .menu {
    text-align: center;
    font-size: 1.5em;
    margin: 1em;
    padding-top: 0;
    border-bottom: 2px solid var(--pico-muted-border-color);
  }

  .menu-item {
    width: max-content;
    margin: 1rem auto;
    display: flex;
    flex-direction: row;
    gap: 1em;
  }

  .avatar {
    width: 48px;
  }
</style>
