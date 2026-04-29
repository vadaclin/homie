<script>
    import { enhance } from "$app/forms";
    let { data } = $props();
</script>

<main class="page">
    <section class="container py-5">
        <div class="topbar">
            <div>
                <p class="eyebrow">Homie</p>
                <h1>Einkaufsliste</h1>
                <p class="subtitle">Alles, was beim nächsten Einkauf nicht fehlen darf.</p>
            </div>
        </div>

        <form method="POST" action="?/add" use:enhance class="add-card">
            <input
                name="name"
                placeholder="Was brauchst du? z.B. Milch"
                required
            />
            <button type="submit">+</button>
        </form>

        <div class="grid">
            {#each data.items as item}
                <div class:done={item.done} class="product-card">
                    <form method="POST" action="?/toggle" use:enhance>
                        <input type="hidden" name="id" value={item._id} />
                        <button class="check" type="submit">
                            {item.done ? "✓" : ""}
                        </button>
                    </form>

                    <span>{item.name}</span>

                    <form method="POST" action="?/delete" use:enhance>
                        <input type="hidden" name="id" value={item._id} />
                        <button class="delete" type="submit">×</button>
                    </form>
                </div>
            {/each}
        </div>
    </section>
</main>

<style>
    .page {
        min-height: 100vh;
        background: #faf7f5;
        color: #2b2b2b;
    }

    .eyebrow {
        color: #d97757;
        font-weight: 700;
        margin-bottom: 0.4rem;
    }

    h1 {
        font-size: 3rem;
        font-weight: 800;
        margin: 0;
    }

    .subtitle {
        color: #8f8179;
        margin-top: 0.5rem;
    }

    .topbar {
        margin-bottom: 2rem;
    }

    .add-card {
        display: flex;
        gap: 0.75rem;
        background: white;
        border: 1px solid #e8e2dd;
        border-radius: 22px;
        padding: 0.75rem;
        box-shadow: 0 12px 30px rgba(43, 43, 43, 0.06);
        margin-bottom: 2rem;
    }

    .add-card input {
        flex: 1;
        border: none;
        outline: none;
        font-size: 1rem;
        padding: 0.75rem;
        background: transparent;
    }

    .add-card button {
        width: 48px;
        height: 48px;
        border: none;
        border-radius: 16px;
        background: #d97757;
        color: white;
        font-size: 1.8rem;
        line-height: 1;
        cursor: pointer;
    }

    .grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
        gap: 1rem;
    }

    .product-card {
        min-height: 120px;
        background: white;
        border: 1px solid #e8e2dd;
        border-radius: 26px;
        padding: 1rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        box-shadow: 0 14px 35px rgba(43, 43, 43, 0.06);
        position: relative;
    }

    .product-card span {
        font-size: 1.1rem;
        font-weight: 700;
        margin-top: 1.8rem;
    }

    .check {
        width: 28px;
        height: 28px;
        border-radius: 50%;
        border: 2px solid #d97757;
        background: white;
        color: #d97757;
        font-weight: 800;
        cursor: pointer;
    }

    .delete {
        position: absolute;
        top: 0.8rem;
        right: 0.9rem;
        border: none;
        background: transparent;
        color: #9a8f87;
        font-size: 1.4rem;
        cursor: pointer;
    }

    .done {
        opacity: 0.55;
    }

    .done span {
        text-decoration: line-through;
    }
</style>