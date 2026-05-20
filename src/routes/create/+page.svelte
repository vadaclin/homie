<script>
  const MAX_CODE_LENGTH = 4;

  let code = $state("");
  let haushaltsname = $state("");
  let isWG = $state(false);
  let codeStatus = $state("idle");
  let { form } = $props();

  let codeMessage = $derived.by(() => {
    if (codeStatus === "checking") return "Code wird geprüft...";
    if (codeStatus === "taken") return "Dieser Code existiert bereits";
    if (codeStatus === "available") return "Dieser Code ist frei";
    return "";
  });

  let isValid = $derived(
    code.length === MAX_CODE_LENGTH &&
      haushaltsname.trim().length > 0 &&
      codeStatus !== "checking" &&
      codeStatus !== "taken"
  );

  async function checkCodeAvailability(event) {
    const input = event.currentTarget;
    code = input.value.replace(/\D/g, "").slice(0, MAX_CODE_LENGTH);
    input.value = code;

    if (code.length !== MAX_CODE_LENGTH) {
      codeStatus = "idle";
      return;
    }

    const checkedCode = code;
    codeStatus = "checking";

    try {
      const response = await fetch(`/create/check-code?code=${encodeURIComponent(checkedCode)}`);
      const result = await response.json();

      if (code !== checkedCode) return;
      codeStatus = result.exists ? "taken" : "available";
    } catch {
      if (code === checkedCode) codeStatus = "idle";
    }
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
        <p class="subtitle">Erstelle deinen Haushalt.</p>
        <p class="intro">Wähle einen 4-stelligen Code.</p>
      </div>

      <form method="POST">
        <input
          name="code"
          bind:value={code}
          maxlength={MAX_CODE_LENGTH}
          inputmode="numeric"
          placeholder="z. B. 4729"
          class:taken={codeStatus === "taken"}
          class:available={codeStatus === "available"}
          required
          oninput={checkCodeAvailability}
        />

        <p class="name-hint">
          Gib deinem Haushalt einen Namen.
        </p>

        <input
          name="haushaltsname"
          bind:value={haushaltsname}
          placeholder="Name oder WG Zürich"
          required
        />

        <div class="toggle-wrapper">
          <span class:active={!isWG}>Einzelperson</span>
          <button
            type="button"
            class="toggle"
            class:wg={isWG}
            onclick={() => (isWG = !isWG)}
            aria-label="WG Modus"
          >
            <span class="knob"></span>
          </button>
          <span class:active={isWG}>WG / Familie</span>
        </div>

        <input type="hidden" name="isWG" value={isWG ? "true" : "false"} />

        <div class="error-slot">
          {#if codeMessage}
            <p class="code-status" class:taken={codeStatus === "taken"} class:available={codeStatus === "available"}>
              {codeMessage}
            </p>
          {:else if form?.error}
            <p class="error">{form.error}</p>
          {/if}
        </div>

        <button type="submit" disabled={!isValid}>
          Haushalt erstellen <span aria-hidden="true">→</span>
        </button>
      </form>

      <a href="/" class="back">← Zurück</a>
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
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
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
    flex-shrink: 0;
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

  input[name="code"],
  input[name="haushaltsname"] {
    width: 100%;
    max-width: 320px;
    padding: 1rem;
    border-radius: 22px;
    border: 1.5px solid #e9b19f;
    outline: none;
    box-sizing: border-box;
    text-align: center;
    font-family: inherit;
  }

  input[name="code"] {
    font-size: 1.5rem;
    letter-spacing: 0.3rem;
  }

  input[name="haushaltsname"] {
    font-size: 1rem;
  }

  input::placeholder {
    font-family: inherit;
    font-weight: inherit;
  }

  input:focus {
    border-color: #d97757;
    box-shadow: 0 0 0 4px rgba(217, 119, 87, 0.14);
  }

  .name-hint {
    width: 100%;
    max-width: none;
    align-self: center;
    text-align: center;
    color: #9a8f87;
    font-size: 0.95rem;
    font-weight: 600;
    line-height: 1.35;
    margin: 0.15rem 0 -0.3rem;
  }

  input[name="code"].taken {
    border-color: #c0392b;
  }

  input[name="code"].available {
    border-color: #6fa66f;
  }

  .toggle-wrapper {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    margin: 0.3rem 0;
    font-size: 0.9rem;
    font-weight: 600;
    color: #9a8f87;
  }

  .toggle-wrapper span.active {
    color: #d97757;
  }

  .toggle {
    width: 52px;
    height: 28px;
    border-radius: 999px;
    border: none;
    background: #e8e2dd;
    cursor: pointer;
    position: relative;
    transition: background 0.25s ease;
    flex-shrink: 0;
  }

  .toggle.wg {
    background: linear-gradient(135deg, #df7b59, #cf6548);
  }

  .knob {
    position: absolute;
    top: 3px;
    left: 3px;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background: white;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
    transition: transform 0.25s ease;
    display: block;
  }

  .toggle.wg .knob {
    transform: translateX(24px);
  }

  .error-slot {
    width: 100%;
    max-width: 320px;
    min-height: 0;
  }

  .error,
  .code-status {
    color: #c0392b;
    font-size: 0.85rem;
    background: #fdecea;
    border-radius: 12px;
    padding: 0.5rem 1rem;
    margin: 0;
    width: 100%;
    box-sizing: border-box;
  }

  .code-status.available {
    color: #3f7d3f;
    background: #edf7ed;
  }

  button[type="submit"] {
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
    margin-top: 0.3rem;
  }

  button[type="submit"]:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .back {
    display: block;
    margin-top: 1rem;
    color: #9a8f87;
    text-decoration: none;
    font-size: 0.9rem;
  }

  .back:hover {
    color: #d97757;
  }
</style>
