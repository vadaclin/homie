<script>
  import "bootstrap/dist/css/bootstrap.min.css";
  let { children } = $props();
</script>

<nav class="navbar navbar-expand-lg custom-nav">
  <div class="container">
    <a class="navbar-brand fw-bold" href="/"> Homie </a>

    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#nav"
    >
      ☰
    </button>

    <div class="collapse navbar-collapse" id="nav">
      <ul class="navbar-nav ms-auto">
        <li class="nav-item">
          <a class="nav-link" href="/vorrat">Vorrat</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/einkaufsliste">Einkaufsliste</a>
        </li>
      </ul>
    </div>
  </div>
</nav>

{@render children()}

<style>
  .custom-nav {
    background: #faf7f5;
    border-bottom: 1px solid #e8e2dd;
  }

  .navbar-brand {
    color: #d97757;
  }

  .nav-link {
    color: #2b2b2b;
    font-weight: 500;
  }

  .nav-link:hover {
    color: #d97757;
  }
</style>
