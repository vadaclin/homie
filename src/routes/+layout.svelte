<script>
  import { page } from "$app/stores";
  import { enhance } from "$app/forms";

  let { data, children } = $props();
  let menuOpen = $state(false);
  let copied = $state(false);

  const NAV_LINKS = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/vorrat", label: "Vorrat" },
    { href: "/einkaufsliste", label: "Einkaufsliste" },
  ];

  async function copyCode() {
    if (!data.haushaltCode) return;
    await navigator.clipboard.writeText(data.haushaltCode);
    copied = true;
    setTimeout(() => (copied = false), 2000);
  }
</script>

{#if data.haushalt}
  <header class="topbar">
    <a href="/dashboard" class="brand">Homie</a>

    <nav>
      {#each NAV_LINKS as { href, label }}
        <a {href} class:active={$page.url.pathname === href}>{label}</a>
      {/each}
    </nav>

    <div class="household-menu">
      <button class="household-button" onclick={() => (menuOpen = !menuOpen)} aria-label="Haushaltsmenü">
        <span>{data.haushaltsname ?? "Haushalt"}</span>
        <span class="chevron">▾</span>
      </button>

      {#if menuOpen}
        <div class="dropdown">
          <div class="dropdown-code">
            <span>Code</span>
            <strong>{data.haushaltCode}</strong>
          </div>
          <button class="dropdown-action" onclick={copyCode}>
            {copied ? "✓ Kopiert!" : "Code kopieren"}
          </button>
          <form method="POST" action="/leave" use:enhance>
            <button class="dropdown-action danger" type="submit">Haushalt verlassen</button>
          </form>
        </div>
        <div
          class="overlay"
          role="button"
          tabindex="0"
          onclick={() => (menuOpen = false)}
          onkeydown={(e) => e.key === "Escape" && (menuOpen = false)}
        ></div>
      {/if}
    </div>
  </header>
{/if}

{@render children()}

<style>
  :global(body) {
    margin: 0;
    font-family: Inter, system-ui, sans-serif;
    background: #faf7f5;
    color: #242424;
  }

  .topbar {
    height: 72px;
    padding: 0 7%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #eee4df;
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(14px);
    position: relative;
    z-index: 10;
  }

  .brand {
    color: #d97757;
    font-size: 1.35rem;
    font-weight: 900;
    text-decoration: none;
  }

  nav {
    display: flex;
    gap: 1.5rem;
    margin-left: auto;
    margin-right: 1.5rem;
  }

  nav a {
    color: #242424;
    text-decoration: none;
    font-weight: 800;
    transition: color 0.15s ease;
  }

  nav a:hover,
  nav a.active {
    color: #d97757;
  }

  .household-menu {
    position: relative;
  }

  .household-button {
    display: flex;
    align-items: center;
    gap: 0.45rem;
    padding: 0.55rem 1rem;
    border-radius: 999px;
    border: 1.5px solid #e8e2dd;
    background: white;
    color: #d97757;
    font-weight: 800;
    font-size: 0.95rem;
    cursor: pointer;
    transition: 0.2s ease;
  }

  .household-button:hover {
    background: #fdece5;
    border-color: #d97757;
  }

  .chevron {
    font-size: 0.75rem;
    color: #9a8f87;
    line-height: 1;
  }

  .dropdown {
    position: absolute;
    right: 0;
    top: calc(100% + 0.6rem);
    width: 220px;
    padding: 0.7rem;
    border-radius: 20px;
    background: white;
    box-shadow: 0 18px 50px rgba(95, 65, 50, 0.16);
    border: 1px solid #eadfd9;
    z-index: 30;
  }

  .dropdown-code {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.7rem 0.8rem;
    margin-bottom: 0.4rem;
    border-radius: 14px;
    background: #fff4ef;
    color: #8f8179;
    font-size: 0.85rem;
    font-weight: 700;
  }

  .dropdown-code strong {
    color: #d97757;
    font-size: 1rem;
    letter-spacing: 0.04em;
  }

  .dropdown-action {
    width: 100%;
    padding: 0.75rem 0.8rem;
    border: none;
    border-radius: 14px;
    background: transparent;
    color: #2b2b2b;
    font: inherit;
    font-weight: 700;
    text-align: left;
    cursor: pointer;
  }

  .dropdown-action:hover {
    background: #fdece5;
    color: #d97757;
  }

  .dropdown-action.danger {
    color: #9a5142;
  }

  .dropdown-action.danger:hover {
    background: #fdecea;
    color: #c0392b;
  }

  .overlay {
    position: fixed;
    inset: 0;
    z-index: 20;
    background: transparent;
    cursor: default;
  }
</style>