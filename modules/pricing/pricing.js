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

                    <select
                        id="pricingScenario"
                        style="
                            height:40px;
                            padding:0 12px;
                            border-radius:10px;
                        "
                    >

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

                    <select
                        id="pricingStatus"
                        style="
                            height:40px;
                            padding:0 12px;
                            border-radius:10px;
                        "
                    >

                        <option value="All">
                            All Status
                        </option>

                    </select>

                    <button
                        id="generatePricingBtn"
                        style="
                            height:40px;
                            padding:0 18px;
                            border:none;
                            border-radius:10px;
                            cursor:pointer;
                            background:#2563eb;
                            color:white;
                            font-weight:600;
                        "
                    >
                        Generate Pricing
                    </button>

                    <button
                        id="refreshPricingBtn"
                        style="
                            height:40px;
                            padding:0 18px;
                            border-radius:10px;
                            cursor:pointer;
                        "
                    >
                        Refresh
                    </button>

                    <button
                        id="exportPricingBtn"
                        style="
                            height:40px;
                            padding:0 18px;
                            border-radius:10px;
                            cursor:pointer;
                        "
                    >
                        Export CSV
                    </button>

                </div>

                <div
                    id="pricingProgress"
                    style="
                        display:none;
                        margin-bottom:20px;
                    "
                ></div>

                <div
                    id="pricingKpis"
                ></div>

                <div
                    id="pricingTableContainer"
                >

                    <div
                        style="
                            padding:40px;
                            text-align:center;
                            color:#666;
                        "
                    >

                        Click
                        <b>
                            Generate Pricing
                        </b>

                        to build pricing.

                    </div>

                </div>

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

        function getSearch(){

            const box =
                document.querySelector(
                    ".global-search-input"
                );

            return box
                ?
                box.value
                :
                "";

        }

        function renderTable(){

            const rows =

                window.MAP
                .PricingRepository
                .getCachedRows(

                    statusSelect.value,

                    getSearch()

                );

            currentRows =

                window.MAP
                .PricingRepository
                .getTopRows(
                    rows,
                    100
                );

            const kpis =

                window.MAP
                .PricingRepository
                .getKpis(
                    rows
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

                <th>ERP Launch Date</th>
                <th>Brand</th>
                <th>Category</th>
                <th>Catalog ID</th>
                <th>Style ID</th>
                <th>Seller SKU</th>
                <th>ERP SKU</th>
                <th>Product ID</th>
                <th>ERP Status</th>

                <th>Current SP</th>

                <th>Recommended SP</th>
                <th>SP Diff</th>
                <th>SP Diff %</th>

                <th>CSP</th>
                <th>Shipping</th>

                <th>Base SP</th>
                <th>Base Shipping</th>
                <th>Tax Shipping</th>

                <th>Base CSP</th>
                <th>Tax CSP</th>

                <th>TCS</th>
                <th>TDS</th>

                <th>Shipping+Tax</th>

                <th>Bank Settlement</th>

                <th>Marketing</th>
                <th>Packing</th>

                <th>Return Charges</th>
                <th>Return %</th>

                <th>Return CODB</th>

                <th>Total CODB</th>

                <th>PA-CODB</th>

                <th>TP</th>

                <th>Diff</th>

                <th>TP Margin %</th>

            </tr>

            </thead>

            <tbody>

            ${currentRows.map(r=>`

                <tr>

                    <td>${r.erp_launch_date}</td>
                    <td>${r.brand}</td>
                    <td>${r.category}</td>
                    <td>${r.catalog_id}</td>
                    <td>${r.style_id}</td>
                    <td>${r.sellersku}</td>
                    <td>${r.erpsku}</td>
                    <td>${r.product_id}</td>
                    <td>${r.erp_status}</td>

                    <td>${r.current_sp.toFixed(2)}</td>

                    <td>${r.sp.toFixed(2)}</td>
                    <td>${r.sp_diff.toFixed(2)}</td>
                    <td>${r.sp_diff_percent.toFixed(2)}%</td>

                    <td>${r.csp.toFixed(2)}</td>
                    <td>${r.shipping.toFixed(2)}</td>

                    <td>${r.base_sp.toFixed(2)}</td>
                    <td>${r.base_shipping.toFixed(2)}</td>
                    <td>${r.tax_on_shipping.toFixed(2)}</td>

                    <td>${r.base_csp.toFixed(2)}</td>
                    <td>${r.tax_on_csp.toFixed(2)}</td>

                    <td>${r.tcs.toFixed(2)}</td>
                    <td>${r.tds.toFixed(2)}</td>

                    <td>${r.shipping_with_tax.toFixed(2)}</td>

                    <td>${r.bank_settlement.toFixed(2)}</td>

                    <td>${r.marketing.toFixed(2)}</td>
                    <td>${r.packing.toFixed(2)}</td>

                    <td>${r.return_charges.toFixed(2)}</td>
                    <td>${r.return_percent}%</td>

                    <td>${r.return_codb.toFixed(2)}</td>

                    <td>${r.total_codb.toFixed(2)}</td>

                    <td>${r.payout_after_codb.toFixed(2)}</td>

                    <td>${r.tp.toFixed(2)}</td>

                    <td>${r.diff.toFixed(2)}</td>

                    <td
                        class="${
                            r.tp_margin_percent <= -35
                            ? 'positive-value'
                            :
                            r.tp_margin_percent > -10
                            ? 'negative-value'
                            : ''
                        }"
                    >
                        ${r.tp_margin_percent.toFixed(2)}%
                    </td>

                </tr>

            `).join("")}

            </tbody>

            </table>

            </div>

            `;

        }

        async function generatePricing(){

            const progress =
                document.getElementById(
                    "pricingProgress"
                );

            progress.style.display =
                "block";

            progress.innerHTML =
                "Starting...";

            await window.MAP
                .PricingRepository
                .generate(

                    scenarioSelect.value,

                    status => {

                        progress.innerHTML = `

                            <div>

                                Generating Pricing

                                (${status.percent}%)

                            </div>

                            <div>

                                ${status.processed.toLocaleString()}
                                /
                                ${status.total.toLocaleString()}

                            </div>

                        `;

                    }

                );

            progress.style.display =
                "none";

            renderTable();

        }

        document
            .getElementById(
                "generatePricingBtn"
            )
            .addEventListener(
                "click",
                generatePricing
            );

        document
            .getElementById(
                "refreshPricingBtn"
            )
            .addEventListener(
                "click",
                generatePricing
            );

        document
            .getElementById(
                "exportPricingBtn"
            )
            .addEventListener(
                "click",
                () => {

                    window.MAP
                    .PricingRepository
                    .exportCSV(
                        currentRows
                    );

                }
            );

        statusSelect
            .addEventListener(
                "change",
                renderTable
            );

        setTimeout(()=>{

            const searchBox =
                document.querySelector(
                    ".global-search-input"
                );

            if(searchBox){

                searchBox
                .addEventListener(
                    "keyup",
                    renderTable
                );

            }

        },500);

    }

});