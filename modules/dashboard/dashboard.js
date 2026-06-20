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

        const adRow =
            adsRepo.getCurrentMonthRow();

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
                                gmv
                            ).toLocaleString()}
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
                            ₹${Math.round(
                                asp
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
                            ROI
                        </div>

                        <div class="kpi-value">
                            ${(roi || 0).toFixed(2)}x
                        </div>

                    </div>

                </div>

                <div
                    style="
                        margin-top:24px;
                        padding:16px;
                        background:#fff;
                        border:1px solid #e5e7eb;
                        border-radius:12px;
                    "
                >

                    <h3>
                        Summary
                    </h3>

                    <table
                        class="report-table"
                    >

                        <tr>
                            <td>
                                Date Range
                            </td>

                            <td>
                                ${fromDate}
                                →
                                ${toDate}
                            </td>
                        </tr>

                        <tr>
                            <td>
                                Records Considered
                            </td>

                            <td>
                                ${salesRepo
                                    .getRows()
                                    .length
                                    .toLocaleString()}
                            </td>
                        </tr>

                        <tr>
                            <td>
                                Selected Month Ad Records
                            </td>

                            <td>
                                ${adRow ? 1 : 0}
                            </td>
                        </tr>

                        <tr>
                            <td>
                                Revenue
                            </td>

                            <td>
                                ₹${Math.round(
                                    adsRepo.getRevenue()
                                ).toLocaleString()}
                            </td>
                        </tr>

                    </table>

                </div>

            </div>

        `;

    }

});