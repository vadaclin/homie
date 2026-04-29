<script>
    import { enhance } from "$app/forms";

    let { data } = $props();
    let modal;

    let gruppiert = $derived(
        (data?.artikel ?? []).reduce((acc, item) => {
            const kat = (item.kategorie || "Sonstiges").trim().toLowerCase();
            const titel = kat.charAt(0).toUpperCase() + kat.slice(1);

            if (!acc[titel]) acc[titel] = [];
            acc[titel].push(item);

            return acc;
        }, {}),
    );
</script>

<main class="page">
    <section class="container py-5">
        <div class="topbar">
            <div>
                <h1>Vorrat</h1>
                <p class="subtitle">
                    Behalte im Blick, was zuhause noch vorhanden ist.
                </p>
            </div>

            <button class="add-btn" onclick={() => modal.showModal()}>
                + Hinzufügen
            </button>
        </div>

        {#if Object.entries(gruppiert).length === 0}
            <div class="empty">
                <h3>Noch kein Vorrat</h3>
                <p>Füge deinen ersten Artikel hinzu.</p>
            </div>
        {/if}

        <div class="columns">
            {#each Object.entries(gruppiert) as [kat, items]}
                <section class="column">
                    <h2>{kat}</h2>

                    <div class="cards">
                        {#each items as item}
                            <div class="karte">
                                <div class="card-top">
                                    <div>
                                        <p class="name">{item.name}</p>
                                        <p class="menge">
                                            {item.menge}
                                            {item.einheit}
                                        </p>
                                    </div>

                                    <form
                                        method="POST"
                                        action="?/loeschen"
                                        use:enhance
                                    >
                                        <input
                                            type="hidden"
                                            name="id"
                                            value={item._id}
                                        />
                                        <button type="submit" class="del"
                                            >×</button
                                        >
                                    </form>
                                </div>
                            </div>
                        {/each}
                    </div>
                </section>
            {/each}
        </div>
    </section>
</main>

<dialog bind:this={modal} id="modal">
    <h3>Artikel hinzufügen</h3>

    <form
        method="POST"
        action="?/hinzufuegen"
        use:enhance
        onsubmit={() => modal.close()}
    >
        <input name="name" placeholder="Name z.B. WC Papier" required />
        <input name="menge" type="number" placeholder="Menge z.B. 3" required />
        <input name="einheit" placeholder="Einheit z.B. Rollen" required />
        <input name="kategorie" placeholder="Kategorie z.B. Bad" required />

        <div class="btns">
            <button type="button" class="cancel" onclick={() => modal.close()}>
                Abbrechen
            </button>
            <button type="submit" class="save">Speichern</button>
        </div>
    </form>
</dialog>

<style>
    .page {
        min-height: 100vh;
        background: #faf7f5;
        color: #2b2b2b;
    }

    .topbar {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        gap: 1rem;
        margin-bottom: 3rem;
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

    .add-btn,
    .save {
        background: #d97757;
        color: white;
        border: none;
        border-radius: 16px;
        padding: 0.85rem 1.2rem;
        font-weight: 700;
        cursor: pointer;
    }

    .add-btn:hover,
    .save:hover {
        background: #c96545;
    }

    .columns {
        display: flex;
        align-items: flex-start;
        gap: 2rem;
        overflow-x: auto;
        padding-bottom: 1rem;
    }

    .column {
        min-width: 220px;
        max-width: 220px;
        flex: 0 0 220px;
    }

    h2 {
        font-size: 0.85rem;
        color: #9a8f87;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        font-weight: 800;
        margin-bottom: 0.8rem;
    }

    .cards {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .karte,
    .empty {
        background: white;
        border: 1px solid #e8e2dd;
        border-radius: 26px;
        box-shadow: 0 14px 35px rgba(43, 43, 43, 0.06);
    }

    .karte {
        width: 100%;
        padding: 1.2rem;
        min-height: 120px;
    }

    .card-top {
        display: flex;
        justify-content: space-between;
        gap: 0.5rem;
    }

    .name {
        font-size: 1.2rem;
        font-weight: 800;
        margin: 0;
    }

    .menge {
        font-size: 1rem;
        color: #9a8f87;
        margin: 0.4rem 0 0;
    }

    .del {
        border: none;
        background: transparent;
        color: #9a8f87;
        font-size: 1.6rem;
        cursor: pointer;
        line-height: 1;
    }

    .del:hover {
        color: #d9534f;
    }

    .empty {
        padding: 2rem;
        text-align: center;
        color: #8f8179;
    }

    .empty h3 {
        color: #2b2b2b;
        font-weight: 800;
    }

    dialog {
        border: 1px solid #e8e2dd;
        border-radius: 26px;
        padding: 1.5rem;
        width: min(360px, calc(100% - 2rem));
        box-shadow: 0 24px 70px rgba(43, 43, 43, 0.2);
    }

    dialog::backdrop {
        background: rgba(43, 43, 43, 0.35);
    }

    dialog h3 {
        font-weight: 800;
        margin-bottom: 1rem;
    }

    dialog input {
        display: block;
        width: 100%;
        margin: 0.65rem 0;
        padding: 0.8rem;
        border: 1px solid #e8e2dd;
        border-radius: 14px;
        font-size: 0.95rem;
        box-sizing: border-box;
    }

    .btns {
        display: flex;
        gap: 0.8rem;
        justify-content: flex-end;
        margin-top: 1rem;
    }

    .cancel {
        background: #faf7f5;
        color: #2b2b2b;
        border: 1px solid #e8e2dd;
        border-radius: 14px;
        padding: 0.8rem 1rem;
        font-weight: 700;
        cursor: pointer;
    }

    @media (max-width: 600px) {
        .topbar {
            flex-direction: column;
        }

        h1 {
            font-size: 2.4rem;
        }

        .add-btn {
            width: 100%;
        }

        .column {
            min-width: 190px;
            max-width: 190px;
            flex-basis: 190px;
        }
    }
</style>
