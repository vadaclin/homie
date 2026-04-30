<script>
  let { data, children } = $props();

  const NAV_LINKS = [
    { href: "/vorrat", label: "Vorrat" },
    { href: "/einkaufsliste", label: "Einkaufsliste" },
  ];
</script>

{#if data.haushalt}
  <header class="topbar">
    <a href="/vorrat" class="brand">Homie</a>
    <nav>
      {#each NAV_LINKS as { href, label }}
        <a {href}>{label}</a>
      {/each}
    </nav>
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
  }

  nav a {
    color: #242424;
    text-decoration: none;
    font-weight: 800;
  }

  nav a:hover {
    color: #d97757;
  }
</style>