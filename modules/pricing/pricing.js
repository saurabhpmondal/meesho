window.MAP = window.MAP || {};

window.MAP.ModuleManager.register({

    id: "pricing",

    title: "Pricing",

    featureFlag: "pricing",

    permission: "pricing_view",

    showSearch: true,

    showFilters: false,

    render(container){

        container.innerHTML = `

        <div class="dashboard-page">

            <div class="dashboard-report-card">

                <div
                    style="
                        display:flex;
                        gap:12px;
                        flex-wrap:wrap;
                        align-items:center;
                        margin-bottom:20px;
                    "
                >

                    <select id="pricingScenario">

                        <option value="BAU">
                            BAU
                        </option>

                        <option value="Small Event">
                            Small Event
                        </option>

                        <option value="Big Event">
                            Big Event
                        </option>

                    </select>

                    <select id="pricingStatus">

                        <option value="All">
                            All Status
                        </option>

                    </select>

                    <button
                        id="generatePricingBtn"
                        class="primary-btn"
                    >
                        Generate Pricing
                    </button>

                    <button
                        id="refreshPricingBtn"
                    >
                        Refresh
                    </button>

                    <button
                        id="exportPricingBtn"
                    >
                        Export CSV
                    </button>

                </div>

                <div
                    id="pricingKpis"
                ></div>

                <div
                    id="pricingTableContainer"
                ></div>

            </div>

        </div>

        `;

        const scenarioSelect =
            document.getElementById(
                "pricingScenario"
            );

        const statusSelect =
            document.getElementById(
                "pricingStatus"
            );

        const statuses =

            window.MAP
            .PricingRepository
            .getStatuses();

        statusSelect.innerHTML = `

            <option value="All">
                All Status
            </option>

            ${statuses.map(x => `
                <option value="${x}">
                    ${x}
                </option>
            `).join("")}

        `;

        let currentRows = [];

        const getSearch = () => {

            const searchBox =
                document.querySelector(
                    ".global-search-input"
                );

            return searchBox
                ?
                searchBox.value
                :
                "";

        };

        const renderTable = () => {

            currentRows =

                window.MAP
                .PricingRepository
                .getRows(

                    scenarioSelect.value,

                    statusSelect.value,

                    getSearch()

                );

            const kpis =

                window.MAP
                .PricingRepository
                .getKpis(
                    currentRows
                );

            document.getElementById(
                "pricingKpis"
            ).innerHTML = `

                <div class="kpi-grid">

                    <div class="kpi-card">

                        <div class="kpi-label">
                            Styles
                        </div>

                        <div class="kpi-value">
                            ${kpis.totalStyles.toLocaleString()}
                        </div>

                    </div>

                    <div class="kpi-card">

                        <div class="kpi-label">
                            Avg TP
                        </div>

                        <div class="kpi-value">
                            ₹${Math.round(
                                kpis.avgTP
                            ).toLocaleString()}
                        </div>

                    </div>

                    <div class="kpi-card">

                        <div class="kpi-label">
                            Avg SP
                        </div>

                        <div class="kpi-value">
                            ₹${Math.round(
                                kpis.avgSP
                            ).toLocaleString()}
                        </div>

                    </div>

                    <div class="kpi-card">

                        <div class="kpi-label">
                            Avg Margin %
                        </div>

                        <div class="kpi-value">
                            ${kpis.avgMargin.toFixed(2)}%
                        </div>

                    </div>

                </div>

            `;

            document.getElementById(
                "pricingTableContainer"
            ).innerHTML = `

            <div
                style="
                    overflow:auto;
                    max-height:75vh;
                "
            >

            <table
                class="report-table"
            >

                <thead
                    style="
                        position:sticky;
                        top:0;
                        background:white;
                        z-index:5;
                    "
                >

                <tr>

                    <th>Style ID</th>
                    <th>ERP SKU</th>
                    <th>Status</th>

                    <th>TP</th>
                    <th>SP</th>
                    <th>CSP</th>

                    <th>Shipping</th>

                    <th>PA-CODB</th>

                    <th>Diff</th>

                    <th>Margin %</th>

                    <th>Brand</th>
                    <th>Category</th>
                    <th>Catalog</th>
                    <th>Seller SKU</th>
                    <th>Product ID</th>

                </tr>

                </thead>

                <tbody>

                ${currentRows.map(r => {

                    let cls =
                        "";

                    if(
                        r.tp_margin_percent
                        <= -35
                    ){
                        cls =
                            "positive-value";
                    }
                    else if(
                        r.tp_margin_percent
                        <= -15
                    ){
                        cls =
                            "";
                    }
                    else{
                        cls =
                            "negative-value";
                    }

                    return `

                    <tr>

                        <td>${r.style_id}</td>

                        <td>${r.erpsku}</td>

                        <td>${r.erp_status}</td>

                        <td>
                            ${r.tp.toFixed(2)}
                        </td>

                        <td>
                            ${r.sp.toFixed(2)}
                        </td>

                        <td>
                            ${r.csp.toFixed(2)}
                        </td>

                        <td>
                            ${r.shipping.toFixed(2)}
                        </td>

                        <td>
                            ${r.payout_after_codb.toFixed(2)}
                        </td>

                        <td>
                            ${r.diff.toFixed(2)}
                        </td>

                        <td
                            class="${cls}"
                        >
                            ${r.tp_margin_percent.toFixed(2)}%
                        </td>

                        <td>${r.brand}</td>

                        <td>${r.category}</td>

                        <td>${r.catalog_id}</td>

                        <td>${r.sellersku}</td>

                        <td>${r.product_id}</td>

                    </tr>

                    `;

                }).join("")}

                </tbody>

            </table>

            </div>

            `;

        };

        document.getElementById(
            "generatePricingBtn"
        ).addEventListener(

            "click",

            renderTable

        );

        document.getElementById(
            "refreshPricingBtn"
        ).addEventListener(

            "click",

            renderTable

        );

        document.getElementById(
            "exportPricingBtn"
        ).addEventListener(

            "click",

            () => {

                window.MAP
                .PricingRepository
                .exportCSV(
                    currentRows
                );

            }

        );

        statusSelect.addEventListener(
            "change",
            renderTable
        );

        scenarioSelect.addEventListener(
            "change",
            renderTable
        );

        setTimeout(() => {

            const searchBox =
                document.querySelector(
                    ".global-search-input"
                );

            if(searchBox){

                searchBox.addEventListener(
                    "keyup",
                    renderTable
                );

            }

        },500);

        renderTable();

    }

});