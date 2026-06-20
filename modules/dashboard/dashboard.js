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

        const roi =
            adsRepo.getROI();

        const meta =
            window.MAP.DataStore
            .metadata;

        container.innerHTML = `

            <div class="dashboard-page">

                <div class="dashboard-header">

                    <h2>
                        Dashboard
                    </h2>

                    <div class="dashboard-meta">

                        <span>
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
                        </span>

                    </div>

                </div>

                <div class="kpi-grid">

                    <div class="kpi-card">

                        <div class="kpi-label">
                            GMV
                        </div>

                        <div class="kpi-value">
                            ₹${Math.round(gmv).toLocaleString()}
                        </div>

                    </div>

                    <div class="kpi-card">

                        <div class="kpi-label">
                            Units
                        </div>

                        <div class="kpi-value">
                            ${units.toLocaleString()}
                        </div>

                    </div>

                    <div class="kpi-card">

                        <div class="kpi-label">
                            ASP
                        </div>

                        <div class="kpi-value">
                            ₹${Math.round(asp).toLocaleString()}
                        </div>

                    </div>

                    <div class="kpi-card">

                        <div class="kpi-label">
                            Ad Spend
                        </div>

                        <div class="kpi-value">
                            ₹${Math.round(adSpend).toLocaleString()}
                        </div>

                    </div>

                    <div class="kpi-card">

                        <div class="kpi-label">
                            ROI
                        </div>

                        <div class="kpi-value">
                            ${roi.toFixed(2)}x
                        </div>

                    </div>

                </div>

                <div class="dashboard-debug">

                    <h3>
                        Data Status
                    </h3>

                    <table class="report-table">

                        <tr>
                            <td>Sales Rows</td>
                            <td>${meta.salesRows}</td>
                        </tr>

                        <tr>
                            <td>Ads Rows</td>
                            <td>${meta.adsRows}</td>
                        </tr>

                        <tr>
                            <td>Master Rows</td>
                            <td>${meta.masterRows}</td>
                        </tr>

                        <tr>
                            <td>Status</td>
                            <td>${meta.refreshStatus}</td>
                        </tr>

                    </table>

                </div>

            </div>

        `;

    }

});