<script>
  import { enhance } from "$app/forms";

  const KATEGORIEN = [
    "Lebensmittel",
    "Tiefkühler",
    "Getränke",
    "Haushalt",
    "Hygiene",
    "Sonstiges",
  ];

  const EINHEITEN = [
    { label: "Keine Angabe", value: "" },
    { label: "Stück", value: "Stück" },
    { label: "Pack", value: "Pack" },
    { label: "kg", value: "kg" },
    { label: "g", value: "g" },
    { label: "Liter", value: "Liter" },
    { label: "Eigene Eingabe...", value: "__custom__" },
  ];

  const STANDARD_EINHEITEN = EINHEITEN.filter(
    (option) => option.value && option.value !== "__custom__",
  ).map((option) => option.value);

  let { data } = $props();

  let showAddModal = $state(false);
  let editArtikel = $state(null);

  let suche = $state("");
  let name = $state("");
  let menge = $state("");
  let einheitAuswahl = $state("");
  let eigeneEinheit = $state("");
  let kategorie = $state(KATEGORIEN[0]);

  let gespeicherteEinheit = $derived(
    einheitAuswahl === "__custom__" ? eigeneEinheit.trim() : einheitAuswahl,
  );

  let gefilterteArtikel = $derived(
    suche.trim() === ""
      ? data.artikel
      : data.artikel.filter((item) =>
          item.name.toLowerCase().includes(suche.toLowerCase()),
        ),
  );

  let gruppiert = $derived(
    gefilterteArtikel.reduce((gruppen, item) => {
      gruppen[item.kategorie] ??= [];
      gruppen[item.kategorie].push(item);
      return gruppen;
    }, {}),
  );

  let sortierteGruppen = $derived(
    Object.entries(gruppiert).sort(([a], [b]) => {
      const indexA = KATEGORIEN.indexOf(a);
      const indexB = KATEGORIEN.indexOf(b);

      if (indexA === -1 && indexB === -1) return a.localeCompare(b, "de");
      if (indexA === -1) return 1;
      if (indexB === -1) return -1;

      return indexA - indexB;
    }),
  );

  function openAdd() {
    name = "";
    menge = "";
    einheitAuswahl = "";
    eigeneEinheit = "";
    kategorie = KATEGORIEN[0];
    showAddModal = true;
  }

  function openEdit(item) {
    editArtikel = item;
    name = item.name;
    menge = item.menge;
    kategorie = item.kategorie;

    if (!item.einheit) {
      einheitAuswahl = "";
      eigeneEinheit = "";
    } else if (STANDARD_EINHEITEN.includes(item.einheit)) {
      einheitAuswahl = item.einheit;
      eigeneEinheit = "";
    } else {
      einheitAuswahl = "__custom__";
      eigeneEinheit = item.einheit;
    }
  }

  function closeModals() {
    showAddModal = false;
    editArtikel = null;
  }

  function mengeLabel(item) {
    return item.einheit ? `${item.menge} ${item.einheit}` : item.menge;
  }
</script>

<main class="page">
  <section class="header">
    <h1>Vorrat</h1>
    <p>Behalte im Blick, was zuhause noch vorhanden ist.</p>
  </section>

  <div class="add-card">
    <input class="suche" bind:value={suche} placeholder="Artikel suchen..." />
    <button type="button" onclick={openAdd} aria-label="Artikel hinzufügen">
      +
    </button>
  </div>

  {#if showAddModal}
    <button
      type="button"
      class="overlay"
      onclick={closeModals}
      aria-label="Modal schliessen"
    ></button>

    <div
      class="modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="add-title"
    >
      <form method="POST" action="?/add">
        <h2 id="add-title">Artikel hinzufügen</h2>

        <input
          name="name"
          bind:value={name}
          placeholder="z. B. Nudeln"
          required
        />

        <div class="menge-row">
          <input
            name="menge"
            bind:value={menge}
            placeholder="Anzahl"
            inputmode="numeric"
          />

          <div class="select-wrapper">
            <select bind:value={einheitAuswahl} aria-label="Einheit optional">
              {#each EINHEITEN as option}
                <option value={option.value}>{option.label}</option>
              {/each}
            </select>
          </div>
        </div>

        {#if einheitAuswahl === "__custom__"}
          <input
            bind:value={eigeneEinheit}
            placeholder="Eigene Einheit, z. B. Karton"
            maxlength="30"
          />
        {/if}

        <input type="hidden" name="einheit" value={gespeicherteEinheit} />

        <div class="select-wrapper">
          <select name="kategorie" bind:value={kategorie}>
            {#each KATEGORIEN as option}
              <option value={option}>{option}</option>
            {/each}
          </select>
        </div>

        <div class="actions">
          <button type="button" class="secondary" onclick={closeModals}>
            Abbrechen
          </button>
          <button type="submit">Speichern</button>
        </div>
      </form>
    </div>
  {/if}

  {#if editArtikel}
    <button
      type="button"
      class="overlay"
      onclick={closeModals}
      aria-label="Modal schliessen"
    ></button>

    <div
      class="modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="edit-title"
    >
      <form method="POST" action="?/update">
        <h2 id="edit-title">Artikel bearbeiten</h2>

        <input type="hidden" name="id" value={editArtikel.id} />

        <input
          name="name"
          bind:value={name}
          placeholder="z. B. Nudeln"
          required
        />

        <div class="menge-row">
          <input
            name="menge"
            bind:value={menge}
            placeholder="Anzahl"
            inputmode="numeric"
          />

          <div class="select-wrapper">
            <select bind:value={einheitAuswahl} aria-label="Einheit optional">
              {#each EINHEITEN as option}
                <option value={option.value}>{option.label}</option>
              {/each}
            </select>
          </div>
        </div>

        {#if einheitAuswahl === "__custom__"}
          <input
            bind:value={eigeneEinheit}
            placeholder="Eigene Einheit, z. B. Karton"
            maxlength="30"
          />
        {/if}

        <input type="hidden" name="einheit" value={gespeicherteEinheit} />

        <div class="select-wrapper">
          <select name="kategorie" bind:value={kategorie}>
            {#each KATEGORIEN as option}
              <option value={option}>{option}</option>
            {/each}
          </select>
        </div>

        <div class="actions">
          <button type="button" class="secondary" onclick={closeModals}>
            Abbrechen
          </button>
          <button type="submit">Speichern</button>
        </div>
      </form>

      <form method="POST" action="?/delete" class="delete-form">
        <input type="hidden" name="id" value={editArtikel.id} />
        <button type="submit" class="delete-btn">Artikel löschen</button>
      </form>
    </div>
  {/if}

  {#if data.artikel.length === 0}
    <section class="empty-card">
      <h2>Noch kein Vorrat</h2>
      <p>Füge deinen ersten Artikel hinzu.</p>
    </section>
  {:else if sortierteGruppen.length === 0}
    <section class="empty-card">
      <h2>Keine Treffer</h2>
      <p>Kein Artikel entspricht deiner Suche.</p>
    </section>
  {:else}
    <section class="kategorien-grid">
      {#each sortierteGruppen as [gruppe, items]}
        <div class="kategorie-card">
          <h2>{gruppe}</h2>

          {#each items as item (item.id)}
            <div class="item" class:low={parseInt(item.menge) === 1}>
              <button
                class="edit-btn"
                onclick={() => openEdit(item)}
                aria-label="Bearbeiten"
              >
                ✎
              </button>

              <strong class:low-text={parseInt(item.menge) === 1}>
                {item.name}
              </strong>

              <div class="item-controls">
                <form method="POST" action="?/updateMenge">
                  <input type="hidden" name="id" value={item.id} />
                  <input type="hidden" name="delta" value="-1" />
                  <button type="submit" class="menge-btn">−</button>
                </form>

                <span class="menge" class:low-text={parseInt(item.menge) === 1}>
                  {mengeLabel(item)}
                </span>

                <form method="POST" action="?/updateMenge">
                  <input type="hidden" name="id" value={item.id} />
                  <input type="hidden" name="delta" value="1" />
                  <button type="submit" class="menge-btn">+</button>
                </form>
              </div>

              {#if parseInt(item.menge) === 1}
                <form
                  method="POST"
                  action="/einkaufsliste?/add"
                  class="einkauf-form"
                  use:enhance={() =>
                    async ({ update }) => {
                      await update({ reset: false });
                    }}
                >
                  <input type="hidden" name="name" value={item.name} />
                  <input type="hidden" name="menge" value={item.menge} />
                  <input type="hidden" name="einheit" value={item.einheit} />
                  <input
                    type="hidden"
                    name="kategorie"
                    value={item.kategorie}
                  />

                  <button type="submit" class="einkauf-btn">
                    + Einkaufsliste
                  </button>
                </form>
              {/if}
            </div>
          {/each}
        </div>
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
    gap: 0.8rem;
    padding: 0.8rem;
    margin-bottom: 2.5rem;
    border-radius: 28px;
    background: rgba(255, 255, 255, 0.9);
    border: 1px solid rgba(232, 226, 221, 0.9);
    box-shadow: 0 18px 50px rgba(95, 65, 50, 0.1);
  }

  .add-card input {
    flex: 1;
    border: none;
    background: transparent;
    padding: 1rem;
    font: inherit;
    font-weight: 600;
    outline: none;
    color: #242424;
  }

  .add-card input::placeholder {
    color: #aaa19c;
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
  .modal select:focus {
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

  .delete-form {
    margin-top: 0.8rem;
  }

  .delete-btn {
    width: 100%;
    padding: 0.8rem;
    border-radius: 18px;
    border: none;
    background: none;
    color: #c0392b;
    font-weight: 700;
    cursor: pointer;
    font-size: 0.9rem;
  }

  .delete-btn:hover {
    background: #fff0ef;
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

  .kategorien-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 1.2rem;
    align-items: stretch;
  }

  .kategorie-card {
    min-height: 380px;
    padding: 1.5rem;
    border-radius: 28px;
    background: rgba(255, 255, 255, 0.9);
    box-shadow: 0 18px 50px rgba(95, 65, 50, 0.1);
  }

  .kategorie-card h2 {
    margin: 0 0 1rem;
    font-size: 1.35rem;
  }

  .item {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    padding: 0.8rem 1rem;
    border-radius: 16px;
    background: #fff4ef;
    margin-top: 0.5rem;
    transition: background 0.2s ease;
  }

  .item.low {
    background: #fff3e0;
  }

  .edit-btn {
    position: absolute;
    top: 0.6rem;
    right: 0.6rem;
    border: none;
    background: none;
    color: #c4b8b1;
    font-size: 0.9rem;
    cursor: pointer;
    padding: 0;
  }

  .edit-btn:hover {
    color: #d97757;
  }

  .item strong {
    font-size: 1rem;
    padding-right: 1.5rem;
  }

  .low-text {
    color: #e67e22;
  }

  .item-controls {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .item-controls form {
    display: contents;
  }

  .menge {
    min-width: 2.8rem;
    text-align: center;
    font-weight: 700;
    color: #8f8179;
    white-space: nowrap;
  }

  .menge-btn {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    border: none;
    background: white;
    color: #d97757;
    font-size: 1.1rem;
    font-weight: 800;
    cursor: pointer;
    display: grid;
    place-items: center;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    transition: 0.15s ease;
  }

  .menge-btn:hover {
    background: #d97757;
    color: white;
  }

  .einkauf-form {
    display: block;
    margin-top: 0.3rem;
  }

  .einkauf-btn {
    width: 100%;
    padding: 0.5rem;
    border-radius: 12px;
    border: none;
    background: #fff0e6;
    color: #e67e22;
    font-weight: 700;
    font-size: 0.8rem;
    cursor: pointer;
    transition: 0.15s ease;
  }

  .einkauf-btn:hover {
    background: #e67e22;
    color: white;
  }

  @media (max-width: 700px) {
    h1 {
      font-size: 2.5rem;
    }

    .add-card {
      border-radius: 24px;
    }

    .menge-row {
      flex-direction: column;
    }
  }
</style>