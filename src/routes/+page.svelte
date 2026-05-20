<script>
  const MAX_CODE_LENGTH = 4;

  let code = $state("");
  let haushaltInfo = $state(null);
  let { form } = $props();

  function sanitizeCode() {
    code = code.replace(/\D/g, "").slice(0, MAX_CODE_LENGTH);
  }

  function oninput() {
    sanitizeCode();
    checkCode();
  }
</script>

<main class="page">
  <section class="hero">
    <div class="card">
      <div class="logo" aria-hidden="true">
        <svg viewBox="0 0 24 24">
          <path d="M4 10.5L12 3l8 7.5V21H4V10.5z" />
          <path d="M9 21v-7h6v7" />
        </svg>
      </div>

      <h1>Homie</h1>
      <div class="intro-copy">
        <p class="subtitle">Dein Haushalt. Einfach organisiert.</p>
        <p class="intro">Gib deinen 4-stelligen Haushaltscode ein.</p>
      </div>

      <form method="POST">
        <input
          name="code"
          bind:value={code}
          {oninput}
          maxlength={MAX_CODE_LENGTH}
          inputmode="numeric"
          placeholder="z.B. 1234"
          required
        />

        <div class="preview-slot">
          <div class="haushalt-preview" class:visible={haushaltInfo}>
            {#if haushaltInfo}
              <span class="haushalt-icon">{haushaltInfo.isWG ? "👥" : "👤"}</span>
              <span>{haushaltInfo.haushaltsname}</span>
            {/if}
          </div>
        </div>

        <div class="error-slot">
          {#if form?.error}
            <p class="error">{form.error}</p>
          {/if}
        </div>

        <button type="submit" disabled={code.length !== MAX_CODE_LENGTH}>
          Beitreten <span aria-hidden="true">→</span>
        </button>
      </form>

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
    min-height: calc(100vh - 72px);
    background:
      radial-gradient(circle at 20% 20%, #ffe8dc 0, transparent 32%),
      radial-gradient(circle at 85% 75%, #f7c7b3 0, transparent 28%),
      linear-gradient(135deg, #fffaf7 0%, #f7f1ed 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
  }

  .hero {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .card {
    width: 100%;
    max-width: 420px;
    min-height: 650px;
    text-align: center;
    padding: 2.6rem 2.4rem;
    border-radius: 36px;
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(18px);
    box-shadow: 0 28px 80px rgba(95, 65, 50, 0.14);
    box-sizing: border-box;
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

  .intro-copy {
    display: grid;
    gap: 0.45rem;
    margin: 0 0 2.2rem;
  }

  .subtitle {
    color: #8f8179;
    margin: 0;
  }

  .intro {
    color: #9a8f87;
    font-size: 0.95rem;
    font-weight: 600;
    margin: 0;
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
    box-sizing: border-box;
  }

  input::placeholder {
    font-family: inherit;
    font-weight: inherit;
  }

  input:focus {
    border-color: #d97757;
    box-shadow: 0 0 0 4px rgba(217, 119, 87, 0.14);
  }

  .preview-slot {
    width: 100%;
    max-width: 320px;
    min-height: 24px;
  }

  .haushalt-preview {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.7rem 1.2rem;
    border-radius: 14px;
    background: #fdece5;
    color: #d97757;
    font-weight: 700;
    font-size: 0.95rem;
    width: 100%;
    box-sizing: border-box;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.2s ease;
  }

  .haushalt-preview.visible {
    opacity: 1;
    visibility: visible;
  }

  .error-slot {
    width: 100%;
    max-width: 320px;
    min-height: 0;
  }

  .error {
    color: #c0392b;
    font-size: 0.85rem;
    background: #fdecea;
    border-radius: 12px;
    padding: 0.5rem 1rem;
    margin: 0;
    width: 100%;
    box-sizing: border-box;
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
    font-size: 1rem;
  }

  button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
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

  .create:hover {
    border-color: #d97757;
    color: #d97757;
  }
</style>
