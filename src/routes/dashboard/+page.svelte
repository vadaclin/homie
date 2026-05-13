<script>
  import { enhance } from "$app/forms";
  import { tick } from "svelte";

  let { data } = $props();

  let todoText = $state("");
  let menuValues = $state({});
  let draggedMeal = $state(null);
  let dragOverTarget = $state(null);

  function makeMealId() {
    if (typeof crypto !== "undefined" && crypto.randomUUID) {
      return crypto.randomUUID();
    }

    return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  }

  function createInitialMenuValues(days) {
    return Object.fromEntries(
      days.map((day) => [
        day.key,
        day.meals.length > 0
          ? day.meals.map((meal) => ({ ...meal }))
          : [{ id: makeMealId(), text: "" }],
      ]),
    );
  }

  $effect(() => {
    menuValues = createInitialMenuValues(data.weekInfo.days);
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

    textarea.classList.remove("single-line");
    textarea.style.height = "auto";

    const neededHeight = Math.max(textarea.scrollHeight, minHeight);
    textarea.style.height = `${neededHeight}px`;

    if (neededHeight <= minHeight + 2) {
      textarea.classList.add("single-line");
      textarea.style.height = `${minHeight}px`;
    }
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

  function getRealMeals(dayKey) {
    return (menuValues[dayKey] ?? []).filter((meal) => meal.text?.trim());
  }

  function ensureVisibleMeal(dayKey) {
    const meals = menuValues[dayKey] ?? [];

    if (meals.length === 0) {
      menuValues[dayKey] = [{ id: makeMealId(), text: "" }];
    }
  }

  function addMeal(event, dayKey, index) {
    event.preventDefault();

    menuValues[dayKey].splice(index + 1, 0, {
      id: makeMealId(),
      text: "",
    });

    menuValues[dayKey] = [...menuValues[dayKey]];

    tick().then(() => {
      document.querySelectorAll(".menu-input").forEach((textarea) => {
        resizeTextarea(textarea);
      });

      const dayInputs = document.querySelectorAll(
        `[data-day-key="${dayKey}"] .menu-input`,
      );

      dayInputs[index + 1]?.focus();
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

    const meals = menuValues[dayKey] ?? [];

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

  function onDragStart(event, dayKey, mealId, index) {
    const meal = menuValues[dayKey]?.find((m) => m.id === mealId);

    if (!meal?.text?.trim()) {
      event.preventDefault();
      return;
    }

    draggedMeal = {
      sourceDayKey: dayKey,
      mealId,
      sourceIndex: index,
      text: meal.text,
    };

    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/plain", mealId);
  }

  function onDragOver(event, dayKey, index) {
    if (!draggedMeal) return;

    event.preventDefault();

    dragOverTarget = {
      dayKey,
      index,
    };
  }

  async function onDrop(event, targetDayKey, targetIndex) {
    event.preventDefault();

    if (!draggedMeal) return;

    const { sourceDayKey, mealId, text } = draggedMeal;

    if (!text?.trim()) {
      draggedMeal = null;
      dragOverTarget = null;
      return;
    }

    const movedMeal = {
      id: mealId,
      text,
    };

    const sourceMealsBefore = menuValues[sourceDayKey] ?? [];
    const oldSourceIndex = sourceMealsBefore.findIndex(
      (meal) => meal.id === mealId,
    );

    let sourceMeals = sourceMealsBefore.filter((meal) => meal.id !== mealId);
    let insertIndex = targetIndex;

    if (
      sourceDayKey === targetDayKey &&
      oldSourceIndex >= 0 &&
      oldSourceIndex < targetIndex
    ) {
      insertIndex = targetIndex - 1;
    }

    if (sourceDayKey === targetDayKey) {
      const cleanedMeals = sourceMeals.filter((meal) => meal.text?.trim());

      insertIndex = Math.max(0, Math.min(insertIndex, cleanedMeals.length));
      cleanedMeals.splice(insertIndex, 0, movedMeal);

      menuValues[targetDayKey] =
        cleanedMeals.length > 0
          ? cleanedMeals
          : [{ id: makeMealId(), text: "" }];
    } else {
      let targetMeals = getRealMeals(targetDayKey);

      insertIndex = Math.max(0, Math.min(insertIndex, targetMeals.length));
      targetMeals.splice(insertIndex, 0, movedMeal);

      menuValues[sourceDayKey] = sourceMeals.filter((meal) =>
        meal.text?.trim(),
      );

      ensureVisibleMeal(sourceDayKey);

      menuValues[targetDayKey] =
        targetMeals.length > 0 ? targetMeals : [{ id: makeMealId(), text: "" }];
    }

    const targetDay = data.weekInfo.days.find(
      (day) => day.key === targetDayKey,
    );

    const formData = new FormData();
    formData.set("sourceDayKey", sourceDayKey);
    formData.set("targetDayKey", targetDayKey);
    formData.set("mealId", mealId);
    formData.set("targetIndex", String(insertIndex));
    formData.set("targetDate", targetDay?.date ?? "");
    formData.set("isoYear", String(data.weekInfo.isoYear));
    formData.set("isoWeek", String(data.weekInfo.isoWeek));

    await fetch("?/moveMenuMeal", {
      method: "POST",
      body: formData,
    });

    draggedMeal = null;
    dragOverTarget = null;

    await tick();

    document.querySelectorAll(".menu-input").forEach((textarea) => {
      resizeTextarea(textarea);
    });
  }

  function onDragEnd() {
    draggedMeal = null;
    dragOverTarget = null;
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

  <div class="dashboard-grid">
    <div class="card card-wide todo-card">
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

    <div class="card overview-card">
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

    <div class="card overview-card">
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
          <div class="menu-row" data-day-key={day.key}>
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
                  class:drag-over={dragOverTarget?.dayKey === day.key &&
                    dragOverTarget?.index === index}
                  draggable={meal.text.trim().length > 0}
                  ondragstart={(event) =>
                    onDragStart(event, day.key, meal.id, index)}
                  ondragover={(event) => onDragOver(event, day.key, index)}
                  ondrop={(event) => onDrop(event, day.key, index)}
                  ondragend={onDragEnd}
                  use:enhance={() =>
                    async ({ update }) => {
                      await update({ reset: false });
                    }}
                >
                  <input type="hidden" name="dayKey" value={day.key} />
                  <input type="hidden" name="mealId" value={meal.id} />
                  <input type="hidden" name="date" value={day.date} />

                  <input
                    type="hidden"
                    name="isoYear"
                    value={data.weekInfo.isoYear}
                  />

                  <input
                    type="hidden"
                    name="isoWeek"
                    value={data.weekInfo.isoWeek}
                  />

                  <div class="menu-input-wrap">
                    <textarea
                      class="menu-input"
                      name="text"
                      bind:value={meal.text}
                      placeholder="Gericht..."
                      rows="1"
                      oninput={autoResize}
                      onblur={(event) =>
                        event.currentTarget.form?.requestSubmit()}
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

                      {#if meal.text}
                        <button
                          type="button"
                          class="menu-clear"
                          onmousedown={(event) => event.preventDefault()}
                          onclick={(event) =>
                            deleteMeal(event, day.key, meal.id)}
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
    background: radial-gradient(circle at 20% 20%, #ffe8dc 0, transparent 32%),
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

  .dashboard-grid {
    display: grid;
    grid-template-columns:
      minmax(280px, 0.85fr)
      minmax(280px, 0.85fr)
      minmax(430px, 1.35fr);
    gap: 1.4rem;
    align-items: start;
  }

  .card {
    padding: 1.5rem;
    border-radius: 32px;
    background: rgba(255, 255, 255, 0.9);
    box-shadow: 0 18px 50px rgba(95, 65, 50, 0.1);
  }

  .card-wide {
    grid-column: 1 / -1;
  }

  .todo-card {
    padding: 1.6rem;
  }

  .overview-card {
    min-height: 205px;
  }

  .menu-card {
    grid-column: 3;
    grid-row: 2 / span 2;
    padding: 1.5rem;
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
    gap: 0.75rem;
  }

  ul li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.75rem 0.95rem;
    border-radius: 16px;
    background: #fff4ef;
    font-weight: 600;
    font-size: 0.95rem;
  }

  .tag,
  .kw-tag {
    font-size: 0.75rem;
    color: #9a8f87;
    background: #f0ebe7;
    padding: 0.2rem 0.65rem;
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
    gap: 0.8rem;
    margin-bottom: 1rem;
  }

  .todo-add input {
    flex: 1;
    padding: 0.8rem 1rem;
    border-radius: 16px;
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
    width: 52px;
    height: 52px;
    border-radius: 16px;
    border: none;
    background: linear-gradient(135deg, #df7b59, #cf6548);
    color: white;
    font-size: 1.7rem;
    font-weight: 700;
    cursor: pointer;
    flex-shrink: 0;
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

  .menu-list {
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
  }

  .menu-row {
    display: grid;
    grid-template-columns: 84px 1fr;
    align-items: center;
    gap: 0.75rem;
    padding: 0.6rem;
    border-radius: 18px;
    background: #fff4ef;
  }

  .menu-day {
    display: flex;
    align-items: center;
    gap: 0.55rem;
    min-width: 0;
  }

  .day-short {
    width: 40px;
    height: 40px;
    border-radius: 14px;
    display: grid;
    place-items: center;
    background: linear-gradient(135deg, #df7b59, #cf6548);
    color: white;
    font-size: 0.85rem;
    font-weight: 900;
    flex-shrink: 0;
  }

  .menu-day small {
    display: block;
    color: #9a8f87;
    font-size: 0.82rem;
    font-weight: 800;
    white-space: nowrap;
  }

  .meal-stack {
    display: flex;
    flex-direction: column;
    gap: 0.45rem;
    min-width: 0;
  }

  .meal-form {
    min-width: 0;
    cursor: grab;
    border-radius: 16px;
    transition:
      transform 0.15s ease,
      opacity 0.15s ease,
      box-shadow 0.15s ease;
  }

  .meal-form:active {
    cursor: grabbing;
  }

  .meal-form.drag-over {
    box-shadow: 0 0 0 3px rgba(217, 119, 87, 0.18);
    transform: scale(1.01);
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
    border-radius: 16px;
    background: rgba(255, 255, 255, 0.92);
    padding: 0.75rem 3.5rem 0.75rem 0.95rem;
    font: inherit;
    font-size: 0.95rem;
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
    right: 0.45rem;
    transform: translateY(-50%);
    display: flex;
    align-items: center;
    gap: 0.12rem;
  }

  .menu-add,
  .menu-clear {
    width: 24px;
    height: 24px;
    border: none;
    border-radius: 999px;
    background: transparent;
    color: #c7bab3;
    font-size: 1.15rem;
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

  @media (max-width: 1300px) {
    .dashboard-grid {
      grid-template-columns: repeat(2, minmax(280px, 1fr));
    }

    .card-wide {
      grid-column: 1 / -1;
    }

    .menu-card {
      grid-column: 1 / -1;
      grid-row: auto;
    }

    .menu-list {
      max-width: 760px;
    }
  }

  @media (max-width: 700px) {
    .page {
      padding: 2rem 5%;
    }

    .header h1 {
      font-size: clamp(1.8rem, 9vw, 2.2rem);
      line-height: 1.08;
      overflow-wrap: normal;
      word-break: normal;
      hyphens: none;
    }

    .dashboard-grid {
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
      gap: 0.5rem;
      align-items: stretch;
    }

    .menu-day {
      justify-content: flex-start;
    }
  }
</style>
