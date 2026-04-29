<main class="home-page">
    <section class="hero container">
        <div class="row align-items-center">
            <div class="col-lg-6">

                <h1>Dein Haushalt. Einfach organisiert.</h1>

                <p class="lead">
                    Behalte Vorräte und Einkaufsliste an einem Ort im Blick —
                    einfach, übersichtlich und perfekt für Alltag, WG oder Familie.
                </p>

                <div class="actions">
                    <a href="/vorrat" class="btn btn-primary btn-lg">
                        Vorrat öffnen
                    </a>
                    <a href="/einkaufsliste" class="btn btn-outline-dark btn-lg">
                        Einkaufsliste
                    </a>
                </div>
            </div>

            <div class="col-lg-6 mt-5 mt-lg-0">
                <div class="preview-card">
                    <div class="card-header-custom">
                        <h5>Heute zuhause</h5>
                        <span>3 Artikel</span>
                    </div>

                    <div class="item">
                        <div>
                            <strong>WC Papier</strong>
                            <p>Bad · 3 Rollen</p>
                        </div>
                        <span class="status green">Gut</span>
                    </div>

                    <div class="item">
                        <div>
                            <strong>Milch</strong>
                            <p>Küche · 1 Liter</p>
                        </div>
                        <span class="status yellow">Mittel</span>
                    </div>

                    <div class="item">
                        <div>
                            <strong>Spülmittel</strong>
                            <p>Küche · fast leer</p>
                        </div>
                        <span class="status red">Niedrig</span>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="features container">
        <div class="row g-4">
            <div class="col-md-4">
                <div class="feature">
                    <span>📦</span>
                    <h3>Vorrat</h3>
                    <p>Sieh sofort, was zuhause noch da ist.</p>
                </div>
            </div>

            <div class="col-md-4">
                <div class="feature">
                    <span>🛒</span>
                    <h3>Einkaufsliste</h3>
                    <p>Sammle fehlende Produkte an einem Ort.</p>
                </div>
            </div>

            <div class="col-md-4">
                <div class="feature">
                    <span>🌱</span>
                    <h3>Weniger Abfall</h3>
                    <p>Kaufe gezielter ein und vermeide Doppelkäufe.</p>
                </div>
            </div>
        </div>
    </section>
</main>

<style>
    .home-page {
        min-height: calc(100vh - 70px);
        background: #faf7f5;
        color: #2b2b2b;
        padding-bottom: 4rem;
    }

    .hero {
        padding-top: 5rem;
        padding-bottom: 4rem;
    }

    h1 {
        font-size: clamp(2.8rem, 6vw, 5rem);
        line-height: 1;
        font-weight: 800;
        max-width: 650px;
    }

    .lead {
        color: #7d746e;
        max-width: 560px;
        margin-top: 1.5rem;
        font-size: 1.2rem;
    }

    .actions {
        display: flex;
        gap: 1rem;
        flex-wrap: wrap;
        margin-top: 2rem;
    }

    .btn-primary {
        background: #d97757;
        border-color: #d97757;
    }

    .btn-primary:hover {
        background: #c96545;
        border-color: #c96545;
    }

    .preview-card,
    .feature {
        background: #fff;
        border: 1px solid #e8e2dd;
        border-radius: 28px;
        box-shadow: 0 24px 60px rgba(43, 43, 43, 0.08);
    }

    .preview-card {
        padding: 1.5rem;
    }

    .card-header-custom {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
    }

    .card-header-custom h5 {
        margin: 0;
        font-weight: 800;
    }

    .card-header-custom span {
        color: #9a8f87;
        font-size: 0.9rem;
    }

    .item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: #faf7f5;
        border-radius: 18px;
        padding: 1rem;
        margin-bottom: 0.75rem;
    }

    .item p {
        margin: 0.2rem 0 0;
        color: #9a8f87;
        font-size: 0.9rem;
    }

    .status {
        font-size: 0.8rem;
        font-weight: 700;
        padding: 0.35rem 0.7rem;
        border-radius: 999px;
    }

    .green {
        color: #4f7f52;
        background: #edf7ed;
    }

    .yellow {
        color: #a57612;
        background: #fff5dc;
    }

    .red {
        color: #b9403c;
        background: #fdeceb;
    }

    .features {
        margin-top: 1rem;
    }

    .feature {
        padding: 1.5rem;
        height: 100%;
    }

    .feature span {
        font-size: 2rem;
    }

    .feature h3 {
        margin-top: 1rem;
        font-size: 1.2rem;
        font-weight: 800;
    }

    .feature p {
        color: #7d746e;
        margin-bottom: 0;
    }
</style>