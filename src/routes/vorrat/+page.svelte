<script>
  import { enhance } from "$app/forms";

  const KATEGORIEN = ["Lebensmittel", "Getränke", "Haushalt", "Hygiene", "Sonstiges"];

  let { data } = $props();
  let showAddModal = $state(false);
  let editArtikel = $state(null);
  let suche = $state("");
  let name = $state("");
  let menge = $state("0");
  let kategorie = $state(KATEGORIEN[0]);

  let gefilterteArtikel = $derived(
    suche.trim() === ""
      ? data.artikel
      : data.artikel.filter((item) => item.name.toLowerCase().includes(suche.toLowerCase()))
  );

  let gruppiert = $derived(
    gefilterteArtikel.reduce((gruppen, item) => {
      gruppen[item.kategorie] ??= [];
      gruppen[item.kategorie].push(item);
      return gruppen;
    }, {})
  );

  function openAdd() {
    name = "";
    menge = "0";
    kategorie = KATEGORIEN[0];
    showAddModal = true;
  }

  function openEdit(item) {
    editArtikel = item;
    name = item.name;
    menge = item.menge;
    kategorie = item.kategorie;
  }

  function closeModals() {
    showAddModal = false;
    editArtikel = null;
  }
</script>

<main class="page">
  <section class="header">
    <div>
      <h1>Vorrat</h1>
      <p>Behalte im Blick, was zuhause noch vorhanden ist.</p>
    </div>
    <button class="add-button" onclick={openAdd}>+ Hinzufügen</button>
  </section>

  <input class="suche" bind:value={suche} placeholder="Artikel suchen…" />

  {#if showAddModal}
    <div class="overlay" onclick={closeModals}></div>
    <div class="modal" role="dialog" aria-modal="true" aria-labelledby="add-title">
      <form method="POST" action="?/add">
        <h2 id="add-title">Artikel hinzufügen</h2>
        <input name="name" bind:value={name} placeholder="z. B. Nudeln" required />
        <input name="menge" bind:value={menge} placeholder="0" inputmode="numeric" />
        <div class="select-wrapper">
          <select name="kategorie" bind:value={kategorie}>
            {#each KATEGORIEN as option}
              <option value={option}>{option}</option>
            {/each}
          </select>
        </div>
        <div class="actions">
          <button type="button" class="secondary" onclick={closeModals}>Abbrechen</button>
          <button type="submit">Speichern</button>
        </div>
      </form>
    </div>
  {/if}

  {#if editArtikel}
    <div class="overlay" onclick={closeModals}></div>
    <div class="modal" role="dialog" aria-modal="true" aria-labelledby="edit-title">
      <form method="POST" action="?/update">
        <h2 id="edit-title">Artikel bearbeiten</h2>
        <input type="hidden" name="id" value={editArtikel.id} />
        <input name="name" bind:value={name} placeholder="z. B. Nudeln" required />
        <input name="menge" bind:value={menge} placeholder="0" inputmode="numeric" />
        <div class="select-wrapper">
          <select name="kategorie" bind:value={kategorie}>
            {#each KATEGORIEN as option}
              <option value={option}>{option}</option>
            {/each}
          </select>
        </div>
        <div class="actions">
          <button type="button" class="secondary" onclick={closeModals}>Abbrechen</button>
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
  {:else if Object.keys(gruppiert).length === 0}
    <section class="empty-card">
      <h2>Keine Treffer</h2>
      <p>Kein Artikel entspricht deiner Suche.</p>
    </section>
  {:else}
    <section class="kategorien-grid">
      {#each Object.entries(gruppiert) as [gruppe, items]}
        <div class="kategorie-card">
          <h2>{gruppe}</h2>
          {#each items as item (item.id)}
            <div class="item" class:low={parseInt(item.menge) === 1}>
              <button class="edit-btn" onclick={() => openEdit(item)} aria-label="Bearbeiten">✎</button>
              <strong class:low-text={parseInt(item.menge) === 1}>{item.name}</strong>
              <div class="item-controls">
                <form method="POST" action="?/updateMenge">
                  <input type="hidden" name="id" value={item.id} />
                  <input type="hidden" name="delta" value="-1" />
                  <button type="submit" class="menge-btn">−</button>
                </form>
                <span class="menge" class:low-text={parseInt(item.menge) === 1}>{item.menge}</span>
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
                  use:enhance={() => async ({ update }) => { await update({ reset: false }); }}
                >
                  <input type="hidden" name="name" value={item.name} />
                  <input type="hidden" name="kategorie" value={item.kategorie} />
                  <button type="submit" class="einkauf-btn">+ Einkaufsliste</button>
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
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
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

  .suche {
    width: 100%;
    box-sizing: border-box;
    padding: 1rem 1.2rem;
    border-radius: 20px;
    border: 1.5px solid #e8e2dd;
    font: inherit;
    font-weight: 600;
    outline: none;
    background: rgba(255, 255, 255, 0.9);
    margin-bottom: 2rem;
    box-shadow: 0 8px 24px rgba(95, 65, 50, 0.07);
  }

  .suche:focus {
    border-color: #d97757;
    box-shadow: 0 0 0 4px rgba(217, 119, 87, 0.14);
  }

  .add-button {
    padding: 0.9rem 1.4rem;
    border-radius: 999px;
    border: none;
    background: linear-gradient(135deg, #df7b59, #cf6548);
    color: white;
    font-weight: 800;
    cursor: pointer;
    box-shadow: 0 10px 24px rgba(217, 119, 87, 0.28);
    transition: 0.2s ease;
  }

  .add-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 14px 30px rgba(217, 119, 87, 0.34);
  }

  .overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.25);
    backdrop-filter: blur(6px);
    z-index: 10;
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

  form {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
  }

  input,
  select {
    padding: 1rem;
    border-radius: 18px;
    border: 1.5px solid #e8e2dd;
    font: inherit;
    outline: none;
  }

  input:focus,
  select:focus {
    border-color: #d97757;
    box-shadow: 0 0 0 4px rgba(217, 119, 87, 0.14);
  }

  .select-wrapper {
    position: relative;
  }

  .select-wrapper select {
    appearance: none;
    width: 100%;
    background: white;
    cursor: pointer;
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
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 1.2rem;
  }

  .kategorie-card {
    padding: 1.5rem;
    border-radius: 28px;
    background: rgba(255, 255, 255, 0.9);
    box-shadow: 0 18px 50px rgba(95, 65, 50, 0.1);
  }

  .kategorie-card h2 {
    margin: 0 0 1rem;
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
    min-width: 1.5rem;
    text-align: center;
    font-weight: 700;
    color: #8f8179;
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
    h1 { font-size: 2.5rem; }
  }
</style>