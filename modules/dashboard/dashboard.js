window.MAP = window.MAP || {};

window.MAP.ModuleManager.register({

    id: "dashboard",

    title: "Dashboard",

    featureFlag: "dashboard",

    permission: "dashboard_view",

    showSearch: true,

    showFilters: true,

    async render(container){

        const salesRepo =
            window.MAP.SalesRepository;

        const adsRepo =
            window.MAP.AdsRepository;

        const gmv =
            salesRepo.getGMV();

        const units =
            salesRepo.getUnits();

        const asp =
            salesRepo.getASP();

        const adSpend =
            adsRepo.getAdSpend();

        const revenue =
            adsRepo.getRevenue();

        const roi =
            adsRepo.getROI();

        const fromDate =
            window.MAP.FilterState
            .getFromDate();

        const toDate =
            window.MAP.FilterState
            .getToDate();

        const search =
            window.MAP.FilterState
            .getSearch();

        const meta =
            window.MAP.DataStore
            .metadata;

        container.innerHTML = `

            <div class="dashboard-page">

                <div class="dashboard-header">

                    <div>

                        <h2>
                            Dashboard
                        </h2>

                        <div class="dashboard-subtitle">

                            ${fromDate}
                            →
                            ${toDate}

                        </div>

                    </div>

                    <div class="dashboard-meta">

                        Last Refresh :
                        ${
                            meta.lastRefresh
                            ?
                            new Date(
                                meta.lastRefresh
                            ).toLocaleString()
                            :
                            "-"
                        }

                    </div>

                </div>

                ${
                    search
                    ?
                    `
                    <div
                        class="dashboard-search-chip"
                    >
                        Search :
                        ${search}
                    </div>
                    `
                    :
                    ""
                }

                <div class="kpi-grid">

                    <div class="kpi-card">

                        <div class="kpi-label">
                            GMV
                        </div>

                        <div class="kpi-value">
                            ₹${Math.round(
                                gmv || 0
                            ).toLocaleString()}
                        </div>

                    </div>

                    <div class="kpi-card">

                        <div class="kpi-label">
                            Units
                        </div>

                        <div class="kpi-value">
                            ${(units || 0)
                                .toLocaleString()}
                        </div>

                    </div>

                    <div class="kpi-card">

                        <div class="kpi-label">
                            ASP
                        </div>

                        <div class="kpi-value">
                            ₹${Math.round(
                                asp || 0
                            ).toLocaleString()}
                        </div>

                    </div>

                    <div class="kpi-card">

                        <div class="kpi-label">
                            Ad Spend
                        </div>

                        <div class="kpi-value">
                            ₹${Math.round(
                                adSpend || 0
                            ).toLocaleString()}
                        </div>

                    </div>

                    <div class="kpi-card">

                        <div class="kpi-label">
                            Revenue
                        </div>

                        <div class="kpi-value">
                            ₹${Math.round(
                                revenue || 0
                            ).toLocaleString()}
                        </div>

                    </div>

                    <div class="kpi-card">

                        <div class="kpi-label">
                            ROI
                        </div>

                        <div class="kpi-value">
                            ${(roi || 0)
                                .toFixed(2)}x
                        </div>

                    </div>

                </div>

                ${window.MAP.DailySalesReport.render()}

                ${window.MAP.MonthlyAdsReport.render()}

                ${window.MAP.TopStatesReport.render()}

            </div>

        `;

    }

});