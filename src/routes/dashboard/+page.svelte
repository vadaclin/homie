<script>
  import { enhance } from "$app/forms";

  let { data } = $props();
  let todoText = $state("");

  function getGreeting() {
    const h = new Date().getHours();
    if (h < 12) return "Guten Morgen";
    if (h < 18) return "Guten Tag";
    return "Guten Abend";
  }
</script>

<main class="page">
  <section class="header">
    <h1>{getGreeting()}, {data.haushaltsname} 👋</h1>
    <p>Hier ist dein Überblick.</p>
  </section>

  <div class="grid">
    <div class="card card-wide">
      <div class="card-header">
        <h2>✅ To-dos</h2>
      </div>

      <form
        method="POST"
        action="?/addTodo"
        class="todo-add"
        use:enhance={() => async ({ update }) => {
          todoText = "";
          await update();
        }}
      >
        <input name="text" bind:value={todoText} placeholder="Neue Aufgabe..." required />
        <button type="submit">+</button>
      </form>

      {#if data.todos.length === 0}
        <p class="empty">Keine Aufgaben.</p>
      {:else}
        <ul class="todo-list">
          {#each data.todos as todo (todo.id)}
            <li class:done={todo.done}>
              <form method="POST" action="?/toggleTodo" use:enhance>
                <input type="hidden" name="id" value={todo.id} />
                <button class="check" class:checked={todo.done} type="submit" aria-label="Todo erledigen"></button>
              </form>
              <span>{todo.text}</span>
              <form method="POST" action="?/deleteTodo" use:enhance>
                <input type="hidden" name="id" value={todo.id} />
                <button class="delete" type="submit" aria-label="Todo löschen">×</button>
              </form>
            </li>
          {/each}
        </ul>
      {/if}
    </div>

    <div class="card">
      <div class="card-header">
        <h2>🛒 Einkaufsliste</h2>
        <a href="/einkaufsliste" class="card-link">Alle →</a>
      </div>
      {#if data.einkaufItems.length === 0}
        <p class="empty">Nichts auf der Liste.</p>
      {:else}
        <ul>
          {#each data.einkaufItems as item}
            <li>{item.name}</li>
          {/each}
        </ul>
      {/if}
    </div>

    <div class="card">
      <div class="card-header">
        <h2>⚠️ Bald leer</h2>
        <a href="/vorrat" class="card-link">Vorrat →</a>
      </div>
      {#if data.baldLeer.length === 0}
        <p class="empty">Alles gut bestückt!</p>
      {:else}
        <ul>
          {#each data.baldLeer as item}
            <li>
              <span>{item.name}</span>
              <span class="tag">{item.kategorie}</span>
            </li>
          {/each}
        </ul>
      {/if}
    </div>
  </div>
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

  .header h1 {
    margin: 0 0 0.4rem;
    font-size: 2.5rem;
    font-weight: 800;
    letter-spacing: -0.04em;
  }

  .header p {
    margin: 0;
    color: #8f8179;
    font-weight: 600;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 1.2rem;
  }

  .card {
    padding: 1.5rem;
    border-radius: 28px;
    background: rgba(255, 255, 255, 0.9);
    box-shadow: 0 18px 50px rgba(95, 65, 50, 0.1);
  }

  .card-wide {
    grid-column: 1 / -1;
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }

  .card-header h2 {
    margin: 0;
    font-size: 1.1rem;
  }

  .card-link {
    font-size: 0.85rem;
    color: #d97757;
    text-decoration: none;
    font-weight: 700;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  ul li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.6rem 0.8rem;
    border-radius: 12px;
    background: #fff4ef;
    font-weight: 600;
    font-size: 0.95rem;
  }

  .tag {
    font-size: 0.75rem;
    color: #9a8f87;
    background: #f0ebe7;
    padding: 0.2rem 0.6rem;
    border-radius: 999px;
  }

  .empty {
    color: #9a8f87;
    font-size: 0.9rem;
    font-weight: 600;
  }

  .todo-add {
    display: flex;
    gap: 0.6rem;
    margin-bottom: 1rem;
  }

  .todo-add input {
    flex: 1;
    padding: 0.7rem 1rem;
    border-radius: 14px;
    border: 1.5px solid #e8e2dd;
    font: inherit;
    font-weight: 600;
    outline: none;
  }

  .todo-add input:focus {
    border-color: #d97757;
    box-shadow: 0 0 0 4px rgba(217, 119, 87, 0.14);
  }

  .todo-add button {
    width: 42px;
    height: 42px;
    border-radius: 12px;
    border: none;
    background: linear-gradient(135deg, #df7b59, #cf6548);
    color: white;
    font-size: 1.5rem;
    font-weight: 700;
    cursor: pointer;
  }

  .todo-list {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .todo-list li {
    display: flex;
    align-items: center;
    gap: 0.7rem;
    padding: 0.6rem 0.8rem;
    border-radius: 12px;
    background: #fff4ef;
  }

  .todo-list li.done span {
    text-decoration: line-through;
    color: #9a8f87;
  }

  .check {
    width: 22px;
    height: 22px;
    border-radius: 50%;
    border: 2px solid #d97757;
    background: transparent;
    cursor: pointer;
    flex-shrink: 0;
  }

  .check.checked {
    background: #d97757;
  }

  .todo-list li span {
    flex: 1;
    font-weight: 600;
    font-size: 0.95rem;
  }

  .delete {
    border: none;
    background: none;
    color: #9a8f87;
    font-size: 1.3rem;
    font-weight: 800;
    cursor: pointer;
    line-height: 1;
  }

  @media (max-width: 700px) {
    .header h1 { font-size: 2rem; }
    .card-wide { grid-column: 1; }
  }
</style>