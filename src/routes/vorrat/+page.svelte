<script>
    import { enhance } from "$app/forms";
    let { data } = $props();
    let gruppiert = $derived(
        data.artikel.reduce((acc, item) => {
            const kat = item.kategorie || "Sonstiges";
            if (!acc[kat]) acc[kat] = [];
            acc[kat].push(item);
            return acc;
        }, {}),
    );
</script>

<main>
    <div class="topbar">
        <h1>Vorrat</h1>
        <button onclick="document.getElementById('modal').showModal()"
            >+ Hinzufügen</button
        >
    </div>

    {#each Object.entries(gruppiert) as [kat, items]}
        <section>
            <h2>{kat}</h2>
            <div class="grid">
                {#each items as item}
                    <div class="karte">
                        <p class="name">{item.name}</p>
                        <p class="menge">{item.menge} {item.einheit}</p>
                        <div class="bar-bg">
                            <div
                                class="bar"
                                style="width: {item.fuellstand}%; background: {farbe(
                                    item.fuellstand,
                                )}"
                            ></div>
                        </div>
                        <p
                            class="status"
                            style="color: {farbe(item.fuellstand)}"
                        >
                            {status(item.fuellstand)}
                        </p>
                        <form method="POST" action="?/loeschen" use:enhance>
                            <input type="hidden" name="id" value={item._id} />
                            <button type="submit" class="del">Löschen</button>
                        </form>
                    </div>
                {/each}
            </div>
        </section>
    {/each}
</main>

<dialog id="modal">
    <h3>Artikel hinzufügen</h3>
    <form
        method="POST"
        action="?/hinzufuegen"
        use:enhance
        onsubmit="document.getElementById('modal').close()"
    >
        <input name="name" placeholder="Name (z.B. WC Papier)" required />
        <input
            name="menge"
            type="number"
            placeholder="Menge (z.B. 3)"
            required
        />
        <input name="einheit" placeholder="Einheit (z.B. Rollen)" required />
        <input name="kategorie" placeholder="Kategorie (z.B. Bad)" required />
        <label
            >Füllstand: <input
                name="fuellstand"
                type="range"
                min="0"
                max="100"
                value="50"
            /></label
        >
        <div class="btns">
            <button
                type="button"
                onclick="document.getElementById('modal').close()"
                >Abbrechen</button
            >
            <button type="submit">Speichern</button>
        </div>
    </form>
</dialog>

<style>
    main {
        max-width: 800px;
        margin: 2rem auto;
        padding: 0 1rem;
        font-family: sans-serif;
    }
    .topbar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1.5rem;
    }
    h1 {
        font-size: 22px;
        font-weight: 500;
        margin: 0;
    }
    h2 {
        font-size: 13px;
        color: #888;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        margin: 1.5rem 0 0.5rem;
    }
    .grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
        gap: 10px;
    }
    .karte {
        background: #fff;
        border: 0.5px solid #e0e0e0;
        border-radius: 12px;
        padding: 12px;
    }
    .name {
        font-size: 13px;
        font-weight: 500;
        margin: 0 0 4px;
    }
    .menge {
        font-size: 12px;
        color: #888;
        margin: 0 0 10px;
    }
    .bar-bg {
        height: 5px;
        background: #f0f0f0;
        border-radius: 99px;
        overflow: hidden;
    }
    .bar {
        height: 100%;
        border-radius: 99px;
        transition: width 0.3s;
    }
    .status {
        font-size: 11px;
        margin: 5px 0 8px;
    }
    .del {
        font-size: 11px;
        color: #e24b4a;
        background: none;
        border: none;
        cursor: pointer;
        padding: 0;
    }
    dialog {
        border-radius: 12px;
        border: 0.5px solid #e0e0e0;
        padding: 1.5rem;
        width: 320px;
    }
    dialog::backdrop {
        background: rgba(0, 0, 0, 0.3);
    }
    dialog input {
        display: block;
        width: 100%;
        margin: 0.5rem 0;
        padding: 8px;
        border: 0.5px solid #ccc;
        border-radius: 8px;
        font-size: 14px;
        box-sizing: border-box;
    }
    .btns {
        display: flex;
        gap: 8px;
        margin-top: 1rem;
        justify-content: flex-end;
    }
    button {
        padding: 8px 16px;
        border-radius: 8px;
        border: 0.5px solid #ccc;
        cursor: pointer;
        font-size: 13px;
    }
</style>
