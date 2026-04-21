<script>
  let { children } = $props();
</script>

<nav>
  <a href="/">Home</a>
  <a href="/vorrat">Vorrat</a>
  <a href="/einkaufsliste">Einkaufsliste</a>
</nav>

{@render children()}

<style>
  nav {
    display: flex;
    gap: 1rem;
    padding: 1rem;
    background: #111827;
  }

  a {
    color: white;
    text-decoration: none;
  }
</style>