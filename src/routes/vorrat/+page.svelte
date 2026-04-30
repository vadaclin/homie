<script>
  let { data } = $props();

  const KATEGORIEN = ["Lebensmittel", "Getränke", "Haushalt", "Hygiene", "Sonstiges"];

  let showModal = $state(false);
  let name = $state("");
  let menge = $state("");
  let kategorie = $state(KATEGORIEN[0]);

  let gruppiert = $derived(
    data.artikel.reduce((gruppen, item) => {
      gruppen[item.kategorie] ??= [];
      gruppen[item.kategorie].push(item);
      return gruppen;
    }, {})
  );

  function openModal() { showModal = true; }
  function closeModal() { showModal = false; }
</script>

<main class="page">
  <section class="header">
    <div>
      <h1>Vorrat</h1>
      <p>Behalte im Blick, was zuhause noch vorhanden ist.</p>
    </div>
    <button class="add-button" onclick={openModal}>+ Hinzufügen</button>
  </section>

  {#if showModal}
    <div class="overlay" onclick={closeModal}></div>

    <div class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <form method="POST" action="?/add">
        <h2 id="modal-title">Artikel hinzufügen</h2>

        <input name="name" bind:value={name} placeholder="z. B. Nudeln" required />
        <input name="menge" bind:value={menge} placeholder="z. B. 2 Packungen" />

        <div class="select-wrapper">
          <select name="kategorie" bind:value={kategorie}>
            {#each KATEGORIEN as option}
              <option value={option}>{option}</option>
            {/each}
          </select>
        </div>

        <div class="actions">
          <button type="button" class="secondary" onclick={closeModal}>Abbrechen</button>
          <button type="submit">Speichern</button>
        </div>
      </form>
    </div>
  {/if}

  {#if data.artikel.length === 0}
    <section class="empty-card">
      <h2>Noch kein Vorrat</h2>
      <p>Füge deinen ersten Artikel hinzu.</p>
    </section>
  {:else}
    <section class="grid">
      {#each Object.entries(gruppiert) as [gruppe, items]}
        <div class="card">
          <h2>{gruppe}</h2>
          {#each items as item (item.id)}
            <div class="item">
              <strong>{item.name}</strong>
              <span>{item.menge}</span>
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
    border: 1px solid #e8e2dd;
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
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 1.2rem;
  }

  .card {
    padding: 1.5rem;
    border-radius: 28px;
    background: rgba(255, 255, 255, 0.9);
    box-shadow: 0 18px 50px rgba(95, 65, 50, 0.1);
  }

  .card h2 {
    margin: 0 0 1rem;
  }

  .item {
    display: flex;
    justify-content: space-between;
    padding: 0.8rem 1rem;
    border-radius: 16px;
    background: #fff4ef;
    margin-top: 0.5rem;
  }

  .item span {
    color: #8f8179;
    font-weight: 700;
  }
</style>