window.MAP = window.MAP || {};

window.MAP.ModuleManager.register({

    id: "pricing",

    title: "Pricing",

    featureFlag: "pricing",

    permission: "pricing_view",

    showSearch: false,

    showFilters: false,

    render(container){

        container.innerHTML = `

        <div class="dashboard-page">

            <div
                class="dashboard-report-card"
            >

                <div
                    style="
                        display:flex;
                        justify-content:space-between;
                        align-items:center;
                        margin-bottom:16px;
                    "
                >

                    <h2>
                        Pricing Engine
                    </h2>

                    <select
                        id="pricingScenario"
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

                </div>

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

        const renderTable = () => {

            const rows =

                window.MAP
                .PricingRepository
                .getRows(

                    scenarioSelect.value

                )
                .slice(
                    0,
                    100
                );

            document.getElementById(
                "pricingTableContainer"
            ).innerHTML = `

            <div
                style="
                    overflow:auto;
                "
            >

            <table
                class="report-table"
            >

                <thead>

                <tr>

                    <th>ERP Launch</th>
                    <th>Brand</th>
                    <th>Category</th>
                    <th>Catalog</th>
                    <th>Style ID</th>
                    <th>Seller SKU</th>
                    <th>ERP SKU</th>
                    <th>Product ID</th>
                    <th>Status</th>

                    <th>CSP</th>
                    <th>SP</th>
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

                    <th>Calc Payout</th>

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

                ${rows.map(r => `

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

                        <td>${r.csp.toFixed(2)}</td>
                        <td>${r.sp.toFixed(2)}</td>
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

                        <td>${r.calc_payout.toFixed(2)}</td>

                        <td>${r.marketing.toFixed(2)}</td>

                        <td>${r.packing.toFixed(2)}</td>

                        <td>${r.return_charges.toFixed(2)}</td>

                        <td>${r.return_percent}%</td>

                        <td>${r.return_codb.toFixed(2)}</td>

                        <td>${r.total_codb.toFixed(2)}</td>

                        <td>${r.payout_after_codb.toFixed(2)}</td>

                        <td>${r.tp.toFixed(2)}</td>

                        <td>${r.diff.toFixed(2)}</td>

                        <td>${r.tp_margin_percent.toFixed(2)}%</td>

                    </tr>

                `).join("")}

                </tbody>

            </table>

            </div>

            `;

        };

        scenarioSelect.addEventListener(
            "change",
            renderTable
        );

        renderTable();

    }

});