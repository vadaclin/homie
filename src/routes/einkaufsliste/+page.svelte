<script>
  import { enhance } from "$app/forms";

  const KATEGORIEN = [
    "Lebensmittel",
    "Tiefkühler",
    "Getränke",
    "Haushalt",
    "Hygiene",
    "Sonstiges"
  ];

  const EINHEITEN = [
    { label: "Keine Angabe", value: "" },
    { label: "Stück", value: "Stück" },
    { label: "Pack", value: "Pack" },
    { label: "Packung", value: "Packung" },
    { label: "Flasche", value: "Flasche" },
    { label: "Dose", value: "Dose" },
    { label: "Glas", value: "Glas" },
    { label: "Beutel", value: "Beutel" },
    { label: "Rolle", value: "Rolle" },
    { label: "Tube", value: "Tube" },
    { label: "kg", value: "kg" },
    { label: "Eigene Eingabe...", value: "__custom__" }
  ];

  const STANDARD_EINHEITEN = EINHEITEN
    .filter((option) => option.value && option.value !== "__custom__")
    .map((option) => option.value);

  let { data } = $props();

  let items = $derived(data.items ?? []);

  let text = $state("");
  let einkaufMenge = $state("");
  let einkaufEinheitAuswahl = $state("");
  let einkaufEigeneEinheit = $state("");

  let vorratModal = $state(null);
  let vorratMenge = $state("1");
  let vorratKategorie = $state(KATEGORIEN[0]);
  let vorratEinheitAuswahl = $state("");
  let vorratEigeneEinheit = $state("");

  let gespeicherteEinkaufEinheit = $derived(
    einkaufEinheitAuswahl === "__custom__"
      ? einkaufEigeneEinheit.trim()
      : einkaufEinheitAuswahl
  );

  let gespeicherteVorratEinheit = $derived(
    vorratEinheitAuswahl === "__custom__"
      ? vorratEigeneEinheit.trim()
      : vorratEinheitAuswahl
  );

  function openVorratModal(item) {
    vorratModal = item;
    vorratMenge = item.menge || "1";
    vorratKategorie = item.kategorie ?? KATEGORIEN[0];

    if (!item.einheit) {
      vorratEinheitAuswahl = "";
      vorratEigeneEinheit = "";
    } else if (STANDARD_EINHEITEN.includes(item.einheit)) {
      vorratEinheitAuswahl = item.einheit;
      vorratEigeneEinheit = "";
    } else {
      vorratEinheitAuswahl = "__custom__";
      vorratEigeneEinheit = item.einheit;
    }
  }

  function closeVorratModal() {
    vorratModal = null;
  }

  function itemMengeLabel(item) {
    if (!item.menge && !item.einheit) return "";
    if (item.menge && item.einheit) return `${item.menge} ${item.einheit}`;
    if (item.menge) return item.menge;
    return item.einheit;
  }

  function resetAddForm() {
    text = "";
    einkaufMenge = "";
    einkaufEinheitAuswahl = "";
    einkaufEigeneEinheit = "";
  }
</script>

<main class="page">
  <section class="header">
    <h1>Einkaufsliste</h1>
    <p>Alles, was beim nächsten Einkauf nicht fehlen darf.</p>
  </section>

  <form
    method="POST"
    action="?/add"
    class="add-card"
    use:enhance={() => async ({ update }) => {
      await update({ reset: false });
      resetAddForm();
    }}
  >
    <div class="add-main-row">
      <input name="name" bind:value={text} placeholder="Was brauchst du? z. B. Milch" required />
      <button type="submit">+</button>
    </div>

    <div class="add-detail-row">
      <input
        name="menge"
        bind:value={einkaufMenge}
        placeholder="Anzahl optional"
        inputmode="numeric"
      />

      <div class="select-wrapper">
        <select bind:value={einkaufEinheitAuswahl} aria-label="Einheit optional">
          {#each EINHEITEN as option}
            <option value={option.value}>{option.label}</option>
          {/each}
        </select>
      </div>
    </div>

    {#if einkaufEinheitAuswahl === "__custom__"}
      <input
        class="custom-unit"
        bind:value={einkaufEigeneEinheit}
        placeholder="Eigene Einheit, z. B. Karton"
        maxlength="30"
      />
    {/if}

    <input type="hidden" name="einheit" value={gespeicherteEinkaufEinheit} />
  </form>

  {#if vorratModal}
    <button
      type="button"
      class="overlay"
      onclick={closeVorratModal}
      aria-label="Modal schliessen"
    ></button>

    <div class="modal" role="dialog" aria-modal="true" aria-labelledby="vorrat-title">
      <form
        method="POST"
        action="?/addToVorrat"
        use:enhance={() => async ({ update }) => {
          await update({ reset: false });
          closeVorratModal();
        }}
      >
        <h2 id="vorrat-title">In Vorrat übernehmen</h2>
        <p class="modal-subtitle">„{vorratModal.name}”</p>

        <input type="hidden" name="name" value={vorratModal.name} />
        <input type="hidden" name="einkaufId" value={vorratModal._id} />

        <div class="menge-row">
          <input
            name="menge"
            bind:value={vorratMenge}
            placeholder="Anzahl"
            inputmode="numeric"
          />

          <div class="select-wrapper">
            <select bind:value={vorratEinheitAuswahl} aria-label="Einheit optional">
              {#each EINHEITEN as option}
                <option value={option.value}>{option.label}</option>
              {/each}
            </select>
          </div>
        </div>

        {#if vorratEinheitAuswahl === "__custom__"}
          <input
            bind:value={vorratEigeneEinheit}
            placeholder="Eigene Einheit, z. B. Karton"
            maxlength="30"
          />
        {/if}

        <input type="hidden" name="einheit" value={gespeicherteVorratEinheit} />

        <div class="select-wrapper">
          <select name="kategorie" bind:value={vorratKategorie}>
            {#each KATEGORIEN as option}
              <option value={option}>{option}</option>
            {/each}
          </select>
        </div>

        <div class="actions">
          <button type="button" class="secondary" onclick={closeVorratModal}>Abbrechen</button>
          <button type="submit">In Vorrat</button>
        </div>
      </form>
    </div>
  {/if}

  {#if items.length === 0}
    <section class="empty-card">
      <h2>Noch nichts auf der Liste</h2>
      <p>Füge deinen ersten Einkauf hinzu.</p>
    </section>
  {:else}
    <section class="grid">
      {#each items as item (item._id)}
        <article class="item-card">
          <button
            class="check"
            class:checked={item.done}
            onclick={() => openVorratModal(item)}
            aria-label="In Vorrat übernehmen"
          ></button>

          <div class="item-content">
            <strong class:done={item.done}>{item.name}</strong>

            <div class="meta-row">
              {#if itemMengeLabel(item)}
                <span class="amount">{itemMengeLabel(item)}</span>
              {/if}

              {#if item.kategorie}
                <span class="badge">{item.kategorie}</span>
              {/if}
            </div>
          </div>

          <form method="POST" action="?/delete">
            <input type="hidden" name="id" value={item._id} />
            <button class="delete" type="submit" aria-label="Löschen">×</button>
          </form>
        </article>
      {/each}
    </section>
  {/if}
</main>

<style>
  .page {
    padding: 3rem 7%;
    background:
      radial-gradient(circle at 20% 20%, #ffe8dc 0, transparent 32%),
      radial-gradient(circle at 85% 75%, #f7c7b3 0, transparent 28%),
      linear-gradient(135deg, #fffaf7 0%, #f7f1ed 100%);
    min-height: calc(100vh - 72px);
  }

  .header {
    margin-bottom: 2.5rem;
  }

  h1 {
    margin: 0 0 0.4rem;
    font-size: 3rem;
    font-weight: 800;
    letter-spacing: -0.04em;
  }

  .header p {
    margin: 0;
    color: #8f8179;
    font-weight: 600;
  }

  .add-card {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    padding: 0.8rem;
    margin-bottom: 2.5rem;
    border-radius: 28px;
    background: rgba(255, 255, 255, 0.9);
    border: 1px solid rgba(232, 226, 221, 0.9);
    box-shadow: 0 18px 50px rgba(95, 65, 50, 0.1);
  }

  .add-main-row {
    display: flex;
    gap: 0.8rem;
  }

  .add-main-row input {
    flex: 1;
  }

  .add-detail-row {
    display: flex;
    gap: 0.8rem;
  }

  .add-detail-row > input {
    flex: 0.85;
    min-width: 0;
  }

  .add-detail-row > .select-wrapper {
    flex: 1.15;
    min-width: 0;
  }

  .add-card input,
  .add-card select {
    width: 100%;
    box-sizing: border-box;
    border: 1.5px solid #e8e2dd;
    background: white;
    padding: 1rem;
    border-radius: 18px;
    font: inherit;
    font-weight: 600;
    outline: none;
    color: #242424;
  }

  .add-card input::placeholder {
    color: #aaa19c;
  }

  .custom-unit {
    width: 100%;
  }

  .add-card button {
    width: 56px;
    height: 56px;
    border-radius: 20px;
    border: none;
    background: linear-gradient(135deg, #df7b59, #cf6548);
    color: white;
    font-size: 2rem;
    font-weight: 700;
    cursor: pointer;
    box-shadow: 0 10px 24px rgba(217, 119, 87, 0.28);
    flex-shrink: 0;
  }

  .overlay {
    position: fixed;
    inset: 0;
    border: none;
    padding: 0;
    background: rgba(0, 0, 0, 0.25);
    backdrop-filter: blur(6px);
    z-index: 10;
    cursor: default;
  }

  .modal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 20;
    width: 90%;
    max-width: 420px;
    padding: 2rem;
    border-radius: 32px;
    background: white;
    box-shadow: 0 30px 80px rgba(0, 0, 0, 0.2);
  }

  .modal-subtitle {
    margin: 0 0 0.5rem;
    color: #8f8179;
    font-weight: 700;
  }

  .modal form {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
  }

  .modal input,
  .modal select {
    width: 100%;
    box-sizing: border-box;
    padding: 1rem;
    border-radius: 18px;
    border: 1.5px solid #e8e2dd;
    font: inherit;
    outline: none;
    background: white;
  }

  .modal input:focus,
  .modal select:focus,
  .add-card input:focus,
  .add-card select:focus {
    border-color: #d97757;
    box-shadow: 0 0 0 4px rgba(217, 119, 87, 0.14);
  }

  .menge-row {
    display: flex;
    gap: 0.8rem;
    width: 100%;
  }

  .menge-row > input {
    flex: 0.85;
    min-width: 0;
  }

  .menge-row > .select-wrapper {
    flex: 1.15;
    min-width: 0;
  }

  .select-wrapper {
    position: relative;
  }

  .select-wrapper select {
    appearance: none;
    width: 100%;
    background: white;
    cursor: pointer;
    padding-right: 2.4rem;
  }

  .select-wrapper::after {
    content: "▾";
    position: absolute;
    right: 1rem;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
    color: #8f8179;
  }

  .actions {
    display: flex;
    gap: 0.7rem;
    margin-top: 0.5rem;
  }

  .actions button {
    flex: 1;
    padding: 1rem;
    border-radius: 22px;
    border: none;
    font-weight: 800;
    cursor: pointer;
  }

  .actions button[type="submit"] {
    background: linear-gradient(135deg, #df7b59, #cf6548);
    color: white;
  }

  .secondary {
    background: white;
    color: #242424;
    border: 1px solid #e8e2dd !important;
  }

  .empty-card {
    padding: 3rem 2rem;
    border-radius: 32px;
    background: rgba(255, 255, 255, 0.86);
    text-align: center;
  }

  .empty-card p {
    color: #8f8179;
    font-weight: 600;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 1.2rem;
  }

  .item-card {
    position: relative;
    min-height: 92px;
    padding: 1rem 3rem 1rem 1rem;
    border-radius: 28px;
    background: rgba(255, 255, 255, 0.9);
    box-shadow: 0 18px 50px rgba(95, 65, 50, 0.1);
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .item-content {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    min-width: 0;
  }

  .item-card strong {
    font-size: 1.05rem;
    word-break: break-word;
  }

  .meta-row {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
    align-items: center;
  }

  .amount {
    width: fit-content;
    padding: 0.22rem 0.55rem;
    border-radius: 999px;
    background: #fff4ef;
    color: #8f8179;
    font-size: 0.72rem;
    font-weight: 800;
  }

  .badge {
    width: fit-content;
    padding: 0.22rem 0.55rem;
    border-radius: 999px;
    background: #fff0e6;
    color: #d97757;
    font-size: 0.72rem;
    font-weight: 800;
  }

  .done {
    color: #9a8f87;
    text-decoration: line-through;
  }

  .check {
    width: 26px;
    height: 26px;
    border-radius: 50%;
    border: 2px solid #d97757;
    background: transparent;
    cursor: pointer;
    flex-shrink: 0;
  }

  .check.checked {
    background: #d97757;
  }

  .delete {
    position: absolute;
    top: 1rem;
    right: 1rem;
    border: none;
    background: none;
    color: #9a8f87;
    font-size: 1.5rem;
    font-weight: 800;
    cursor: pointer;
  }

  .delete:hover {
    color: #c0392b;
  }

  @media (max-width: 700px) {
    h1 {
      font-size: 2.5rem;
    }

    .add-card {
      border-radius: 24px;
    }

    .add-main-row,
    .add-detail-row,
    .menge-row,
    .actions {
      flex-direction: column;
    }

    .add-card button {
      width: 100%;
    }

    .grid {
      grid-template-columns: 1fr;
    }
  }
</style>