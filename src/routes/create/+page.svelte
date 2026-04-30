<script>
  const MAX_CODE_LENGTH = 4;

  let code = $state("");

  function sanitizeCode() {
    code = code.replace(/\D/g, "").slice(0, MAX_CODE_LENGTH);
  }
</script>

<main class="page">
  <div class="background-shape shape-one"></div>
  <div class="background-shape shape-two"></div>

  <section class="hero">
    <div class="card">
      <div class="logo" aria-hidden="true">
        <svg viewBox="0 0 24 24">
          <path d="M4 10.5L12 3l8 7.5V21H4V10.5z" />
          <path d="M9 21v-7h6v7" />
        </svg>
      </div>

      <h1>Homie</h1>
      <p class="subtitle">Dein Haushalt. Einfach organisiert.</p>

      <form method="POST">
        <input
          name="code"
          bind:value={code}
          oninput={sanitizeCode}
          maxlength={MAX_CODE_LENGTH}
          inputmode="numeric"
          placeholder="1234"
          required
        />
        <button type="submit" disabled={code.length !== MAX_CODE_LENGTH}>
          Beitreten <span aria-hidden="true">→</span>
        </button>
      </form>

      <p class="hint">Gib den Code deines Haushalts ein</p>

      <div class="divider" aria-hidden="true">
        <span></span>
        oder
        <span></span>
      </div>

      <a href="/create" class="create">Haushalt erstellen</a>
    </div>
  </section>
</main>

<style>
  :global(body) {
    margin: 0;
    font-family: Inter, system-ui, sans-serif;
    color: #242424;
  }

  .page {
    min-height: 100vh;
    background:
      radial-gradient(circle at 20% 20%, #ffe8dc 0, transparent 32%),
      radial-gradient(circle at 85% 75%, #f7c7b3 0, transparent 28%),
      linear-gradient(135deg, #fffaf7 0%, #f7f1ed 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
  }

  .card {
    width: 100%;
    max-width: 380px;
    text-align: center;
    padding: 2.6rem 2.4rem;
    border-radius: 36px;
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(18px);
    box-shadow: 0 28px 80px rgba(95, 65, 50, 0.14);
  }

  .logo {
    width: 72px;
    height: 72px;
    margin: 0 auto 1.3rem;
    display: grid;
    place-items: center;
    border-radius: 50%;
    background: #fdece5;
    color: #d97757;
  }

  .logo svg {
    width: 34px;
    height: 34px;
    fill: none;
    stroke: currentColor;
    stroke-width: 2.7;
  }

  h1 {
    margin: 0 0 0.5rem;
    font-size: 3rem;
    font-weight: 800;
  }

  .subtitle {
    color: #8f8179;
    margin-bottom: 1.8rem;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 0.7rem;
    align-items: center;
  }

  input {
    width: 100%;
    max-width: 320px;
    padding: 1rem;
    font-size: 1.5rem;
    text-align: center;
    letter-spacing: 0.3rem;
    border-radius: 22px;
    border: 1.5px solid #e9b19f;
    outline: none;
  }

  input:focus {
    border-color: #d97757;
    box-shadow: 0 0 0 4px rgba(217, 119, 87, 0.14);
  }

  button {
    width: 100%;
    max-width: 320px;
    padding: 1.1rem;
    border-radius: 22px;
    border: none;
    background: linear-gradient(135deg, #df7b59, #cf6548);
    color: white;
    font-weight: 800;
    cursor: pointer;
  }

  button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .hint {
    font-size: 0.85rem;
    color: #9a8f87;
    margin-top: 0.5rem;
  }

  .divider {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin: 1.5rem 0;
    color: #8f8179;
  }

  .divider span {
    flex: 1;
    height: 1px;
    background: #eadfd9;
  }

  .create {
    display: block;
    padding: 1rem;
    border-radius: 22px;
    border: 1px solid #e8e2dd;
    text-decoration: none;
    color: #2b2b2b;
    font-weight: 700;
  }
</style>