<script>
  import { enhance } from "$app/forms";
  import { tick } from "svelte";

  let { data } = $props();
  let todoText = $state("");

  let menuValues = $state({});
  let activeWeekKey = $state("");

  function makeMealId() {
    if (typeof crypto !== "undefined" && crypto.randomUUID) {
      return crypto.randomUUID();
    }

    return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  }

  function buildMenuValues(days) {
    return Object.fromEntries(
      days.map((day) => [
        day.key,
        day.meals.length > 0
          ? day.meals.map((meal) => ({ ...meal }))
          : [{ id: makeMealId(), text: "" }]
      ])
    );
  }

  $effect(() => {
    const weekInfo = data.weekInfo;
    const weekKey = `${weekInfo.isoYear}-${weekInfo.isoWeek}`;

    if (activeWeekKey !== weekKey) {
      activeWeekKey = weekKey;
      menuValues = buildMenuValues(weekInfo.days);
    }
  });

  function getGreeting() {
    const h = new Date().getHours();
    if (h < 12) return "Guten Morgen";
    if (h < 18) return "Guten Tag";
    return "Guten Abend";
  }

  function resizeTextarea(textarea) {
    if (!textarea) return;

    const minHeight = 46;

    textarea.style.height = `${minHeight}px`;
    textarea.style.height = `${Math.max(textarea.scrollHeight, minHeight)}px`;
  }

  function autoResize(event) {
    resizeTextarea(event.currentTarget);
  }

  function submitOnEnter(event) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      event.currentTarget.form?.requestSubmit();
      event.currentTarget.blur();
    }
  }

  function addMeal(event, dayKey, index) {
    event.preventDefault();

    const form = event.currentTarget.form;
    form?.requestSubmit();

    menuValues[dayKey].splice(index + 1, 0, {
      id: makeMealId(),
      text: ""
    });

    menuValues[dayKey] = [...menuValues[dayKey]];

    tick().then(() => {
      document.querySelectorAll(".menu-input").forEach((textarea) => {
        resizeTextarea(textarea);
      });
    });
  }

  function deleteMeal(event, dayKey, mealId) {
    event.preventDefault();

    const form = event.currentTarget.form;
    const field = form?.elements?.text;

    if (field) {
      field.value = "";
      resizeTextarea(field);
    }

    const meals = menuValues[dayKey];

    if (meals.length <= 1) {
      meals[0].text = "";
      menuValues[dayKey] = [...meals];
    } else {
      menuValues[dayKey] = meals.filter((meal) => meal.id !== mealId);
    }

    requestAnimationFrame(() => {
      form?.requestSubmit();
    });
  }

  $effect(() => {
    menuValues;

    tick().then(() => {
      document.querySelectorAll(".menu-input").forEach((textarea) => {
        resizeTextarea(textarea);
      });
    });
  });
</script>

<main class="page">
  <section class="header">
    <h1>{getGreeting()}, {data.haushaltsname} 👋</h1>
    <p>Hier ist dein Überblick.</p>
  </section>

  <div class="grid">
    <div class="card card-wide">
      <div class="card-header">
        <h2>✅ To-do's</h2>
      </div>

      <form
        method="POST"
        action="?/addTodo"
        class="todo-add"
        use:enhance={() =>
          async ({ update }) => {
            todoText = "";
            await update();
          }}
      >
        <input
          name="text"
          bind:value={todoText}
          placeholder="Neue Aufgabe..."
          required
        />

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
                <button
                  class="check"
                  class:checked={todo.done}
                  type="submit"
                  aria-label="Todo erledigen"
                ></button>
              </form>

              <span>{todo.text}</span>

              <form method="POST" action="?/deleteTodo" use:enhance>
                <input type="hidden" name="id" value={todo.id} />
                <button class="delete" type="submit" aria-label="Todo löschen">
                  ×
                </button>
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

    <div class="card menu-card">
      <div class="card-header">
        <h2>🍽️ Wochenmenü</h2>
        <span class="kw-tag">KW {data.weekInfo.isoWeek}</span>
      </div>

      <div class="menu-list">
        {#each data.weekInfo.days as day}
          <div class="menu-row">
            <div class="menu-day">
              <span class="day-short">{day.short}</span>
              <small>{day.displayDate}</small>
            </div>

            <div class="meal-stack">
              {#each menuValues[day.key] ?? [] as meal, index (meal.id)}
                <form
                  method="POST"
                  action="?/saveMenuMeal"
                  class="meal-form"
                  use:enhance={() =>
                    async ({ update }) => {
                      await update({ reset: false });
                    }}
                >
                  <input type="hidden" name="dayKey" value={day.key} />
                  <input type="hidden" name="mealId" value={meal.id} />
                  <input type="hidden" name="date" value={day.date} />
                  <input type="hidden" name="isoYear" value={data.weekInfo.isoYear} />
                  <input type="hidden" name="isoWeek" value={data.weekInfo.isoWeek} />

                  <div class="menu-input-wrap">
                    <textarea
                      class="menu-input"
                      name="text"
                      bind:value={meal.text}
                      placeholder="Gericht..."
                      rows="1"
                      oninput={autoResize}
                      onblur={(event) => event.currentTarget.form?.requestSubmit()}
                      onkeydown={submitOnEnter}
                    ></textarea>

                    <div class="menu-actions">
                      <button
                        type="button"
                        class="menu-add"
                        onmousedown={(event) => event.preventDefault()}
                        onclick={(event) => addMeal(event, day.key, index)}
                        aria-label="Weiteres Gericht hinzufügen"
                      >
                        +
                      </button>

                      {#if meal.text || menuValues[day.key].length > 1}
                        <button
                          type="button"
                          class="menu-clear"
                          onmousedown={(event) => event.preventDefault()}
                          onclick={(event) => deleteMeal(event, day.key, meal.id)}
                          aria-label="Gericht löschen"
                        >
                          ×
                        </button>
                      {/if}
                    </div>
                  </div>
                </form>
              {/each}
            </div>
          </div>
        {/each}
      </div>
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
    grid-template-columns: repeat(3, minmax(260px, 1fr));
    gap: 1.2rem;
    align-items: start;
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
    gap: 1rem;
  }

  .card-header h2 {
    margin: 0;
    font-size: 1.1rem;
  }

  .card-link {
    font-size: 0.85rem;
    color: #d97757;
    text-decoration: none;
    font-weight: 800;
    white-space: nowrap;
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

  .tag,
  .kw-tag {
    font-size: 0.75rem;
    color: #9a8f87;
    background: #f0ebe7;
    padding: 0.2rem 0.6rem;
    border-radius: 999px;
    font-weight: 800;
  }

  .kw-tag {
    color: #d97757;
    background: #fff0e6;
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

  .delete:hover {
    color: #c0392b;
  }

  .menu-card {
    align-self: start;
    padding: 1.5rem;
  }

  .menu-card .card-header {
    max-width: 720px;
    margin-left: auto;
    margin-right: auto;
  }

  .menu-list {
    display: flex;
    flex-direction: column;
    gap: 0.55rem;
    max-width: 720px;
    margin: 0 auto;
  }

  .menu-row {
    display: grid;
    grid-template-columns: 82px 1fr;
    align-items: center;
    gap: 0.65rem;
    padding: 0.55rem;
    border-radius: 16px;
    background: #fff4ef;
  }

  .menu-day {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    min-width: 0;
    align-self: center;
  }

  .day-short {
    width: 34px;
    height: 34px;
    border-radius: 12px;
    display: grid;
    place-items: center;
    background: linear-gradient(135deg, #df7b59, #cf6548);
    color: white;
    font-size: 0.78rem;
    font-weight: 900;
    flex-shrink: 0;
  }

  .menu-day small {
    color: #9a8f87;
    font-size: 0.76rem;
    font-weight: 800;
    white-space: nowrap;
  }

  .meal-stack {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 0.45rem;
    min-width: 0;
  }

  .meal-form {
    min-width: 0;
  }

  .menu-input-wrap {
    position: relative;
    min-width: 0;
    display: flex;
    align-items: center;
  }

  .menu-input {
    width: 100%;
    min-width: 0;
    min-height: 46px;
    box-sizing: border-box;
    border: none;
    border-radius: 14px;
    background: rgba(255, 255, 255, 0.92);
    padding: 0.78rem 3.5rem 0.72rem 0.9rem;
    font: inherit;
    font-size: 0.88rem;
    font-weight: 800;
    line-height: 1.25;
    outline: none;
    color: #242424;
    resize: none;
    overflow: hidden;
    display: block;
  }

  .menu-input::placeholder {
    color: #aaa19c;
    font-weight: 800;
  }

  .menu-input:focus {
    background: white;
    box-shadow: 0 0 0 3px rgba(217, 119, 87, 0.14);
  }

  .menu-actions {
    position: absolute;
    top: 50%;
    right: 0.5rem;
    transform: translateY(-50%);
    display: flex;
    align-items: center;
    gap: 0.1rem;
  }

  .menu-add,
  .menu-clear {
    width: 22px;
    height: 22px;
    border: none;
    border-radius: 999px;
    background: transparent;
    color: #c7bab3;
    font-size: 1.05rem;
    font-weight: 900;
    line-height: 1;
    cursor: pointer;
    display: grid;
    place-items: center;
    padding: 0;
  }

  .menu-add:hover {
    color: #d97757;
    background: #fff0e6;
  }

  .menu-clear:hover {
    color: #c0392b;
    background: #fff0ef;
  }

  @media (max-width: 1050px) {
    .grid {
      grid-template-columns: repeat(2, minmax(260px, 1fr));
    }

    .menu-card {
      grid-column: 1 / -1;
    }
  }

  @media (max-width: 700px) {
    .page {
      padding: 2rem 5%;
    }

    .header h1 {
      font-size: clamp(1.8rem, 9vw, 2.2rem);
      line-height: 1.08;
      overflow-wrap: anywhere;
      word-break: normal;
      hyphens: auto;
    }

    .grid {
      grid-template-columns: 1fr;
    }

    .card-wide,
    .menu-card {
      grid-column: 1;
    }

    .todo-add {
      flex-direction: column;
    }

    .todo-add button {
      width: 100%;
    }

    .menu-row {
      grid-template-columns: 1fr;
      gap: 0.55rem;
    }

    .menu-day {
      justify-content: flex-start;
    }
  }
</style>