<script>
  let { data } = $props();

  let text = $state("");
</script>

<main class="page">
  <section class="header">
    <h1>Einkaufsliste</h1>
    <p>Alles, was beim nächsten Einkauf nicht fehlen darf.</p>
  </section>

  <form method="POST" action="?/add" class="add-card">
    <input
      name="name"
      bind:value={text}
      placeholder="Was brauchst du? z. B. Milch"
      required
    />
    <button type="submit">+</button>
  </form>

  {#if data.items.length === 0}
    <section class="empty-card">
      <h2>Noch nichts auf der Liste</h2>
      <p>Füge deinen ersten Einkauf hinzu.</p>
    </section>
  {:else}
    <section class="grid">
      {#each data.items as item (item._id)}
        <article class="item-card">
          <form method="POST" action="?/toggle">
            <input type="hidden" name="id" value={item._id} />
            <button class="check" class:checked={item.done} type="submit"></button>
          </form>

          <strong class:done={item.done}>{item.name}</strong>

          <form method="POST" action="?/delete">
            <input type="hidden" name="id" value={item._id} />
            <button class="delete" type="submit">×</button>
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
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
    gap: 1.2rem;
  }

  .item-card {
    position: relative;
    min-height: 80px;
    padding: 1rem;
    border-radius: 28px;
    background: rgba(255, 255, 255, 0.9);
    box-shadow: 0 18px 50px rgba(95, 65, 50, 0.1);
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .item-card strong {
    font-size: 1.05rem;
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

  @media (max-width: 700px) {
    h1 {
      font-size: 2.5rem;
    }

    .add-card {
      border-radius: 24px;
    }
  }
</style>