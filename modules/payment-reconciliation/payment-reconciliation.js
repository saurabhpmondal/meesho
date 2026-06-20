window.MAP = window.MAP || {};

window.MAP.ModuleManager.register({

    id: "payment-reconciliation",

    title: "Payment Reconciliation",

    featureFlag: "pricing",

    permission: "pricing_view",

    showSearch: false,

    showFilters: false,

    render(container){

        container.innerHTML = `

        <div class="dashboard-page">

            <div class="dashboard-report-card">

                <div
                    style="
                        display:flex;
                        justify-content:space-between;
                        align-items:center;
                        margin-bottom:20px;
                    "
                >

                    <h2>
                        Payment Reconciliation
                    </h2>

                    <button
                        id="exportPaymentReportBtn"
                        style="
                            display:none;
                        "
                    >
                        Export Report
                    </button>

                </div>

                <div
                    style="
                        display:flex;
                        gap:12px;
                        align-items:center;
                        margin-bottom:20px;
                    "
                >

                    <input
                        type="file"
                        id="paymentFile"
                        accept=".xlsx"
                    >

                    <button
                        id="verifyPaymentBtn"
                    >
                        Verify Payments
                    </button>

                </div>

                <div
                    id="paymentSummary"
                ></div>

                <div
                    id="paymentReport"
                    style="
                        margin-top:20px;
                    "
                ></div>

            </div>

        </div>

        `;

        let latestResult = null;

        document
        .getElementById(
            "verifyPaymentBtn"
        )
        .addEventListener(

            "click",

            async () => {

                try{

                    const file =

                        document
                        .getElementById(
                            "paymentFile"
                        )
                        .files[0];

                    if(!file){

                        alert(
                            "Please select settlement file"
                        );

                        return;

                    }

                    const data =

                        await file.arrayBuffer();

                    const workbook =

                        XLSX.read(
                            data,
                            {
                                type:
                                    "array"
                            }
                        );

                    const sheetName =

                        workbook
                        .SheetNames[0];

                    const worksheet =

                        workbook
                        .Sheets[
                            sheetName
                        ];

                    const rows =

                        XLSX.utils
                        .sheet_to_json(

                            worksheet,

                            {

                                range: 1

                            }

                        );

                    latestResult =

                        window.MAP
                        .PaymentReconciliationRepository
                        .verify(
                            rows
                        );

                    renderSummary(
                        latestResult
                        .summary
                    );

                    renderReport(
                        latestResult
                        .report
                    );

                    document
                    .getElementById(
                        "exportPaymentReportBtn"
                    )
                    .style.display =
                        "block";

                }
                catch(error){

                    console.error(
                        error
                    );

                    alert(
                        error.message
                    );

                }

            }

        );

        document
        .getElementById(
            "exportPaymentReportBtn"
        )
        .addEventListener(

            "click",

            () => {

                if(
                    !latestResult
                ){
                    return;
                }

                const ws =

                    XLSX.utils
                    .json_to_sheet(

                        latestResult
                        .report

                    );

                const wb =

                    XLSX.utils
                    .book_new();

                XLSX.utils
                .book_append_sheet(

                    wb,

                    ws,

                    "Payment Report"

                );

                XLSX.writeFile(

                    wb,

                    "Payment_Reconciliation_Report.xlsx"

                );

            }

        );

        function renderSummary(
            summary
        ){

            document
            .getElementById(
                "paymentSummary"
            )
            .innerHTML = `

            <div
                style="
                    display:grid;
                    grid-template-columns:
                        repeat(
                            5,
                            1fr
                        );
                    gap:12px;
                "
            >

                ${card(
                    "Total Rows",
                    summary.totalRows
                )}

                ${card(
                    "Verified",
                    summary.verifiedRows
                )}

                ${card(
                    "Higher Payout",
                    summary.higherPayoutRows
                )}

                ${card(
                    "Lower Payout",
                    summary.lowerPayoutRows
                )}

                ${card(
                    "SKU Not Found",
                    summary.skuNotFoundRows
                )}

            </div>

            `;

        }

        function card(
            title,
            value
        ){

            return `

            <div
                class="
                    dashboard-kpi-card
                "
            >

                <div
                    class="
                        kpi-title
                    "
                >
                    ${title}
                </div>

                <div
                    class="
                        kpi-value
                    "
                >
                    ${value}
                </div>

            </div>

            `;

        }

        function renderReport(
            rows
        ){

            document
            .getElementById(
                "paymentReport"
            )
            .innerHTML = `

            <div
                style="
                    overflow:auto;
                "
            >

            <table
                class="
                    report-table
                "
            >

                <thead>

                    <tr>

                        <th>Status</th>

                        <th>Sub Order No</th>

                        <th>Supplier SKU</th>

                        <th>Catalog ID</th>

                        <th>Transaction ID</th>

                        <th>Live Order Status</th>

                        <th>Expected Settlement</th>

                        <th>Final Settlement</th>

                        <th>Difference</th>

                        <th>Listing Price</th>

                        <th>Quantity</th>

                        <th>Total Sale Amount</th>

                        <th>Shipping Charge</th>

                        <th>TCS</th>

                        <th>TDS</th>

                    </tr>

                </thead>

                <tbody>

                ${rows.map(row => `

                    <tr>

                        <td>
                            ${row.status}
                        </td>

                        <td>
                            ${row["Sub Order No"] || ""}
                        </td>

                        <td>
                            ${row["Supplier SKU"] || ""}
                        </td>

                        <td>
                            ${row["Catalog ID"] || ""}
                        </td>

                        <td>
                            ${row["Transaction ID"] || ""}
                        </td>

                        <td>
                            ${row["Live Order Status"] || ""}
                        </td>

                        <td>
                            ${Number(
                                row.expectedSettlement || 0
                            ).toFixed(2)}
                        </td>

                        <td>
                            ${Number(
                                row.actualSettlement || 0
                            ).toFixed(2)}
                        </td>

                        <td>
                            ${Number(
                                row.difference || 0
                            ).toFixed(2)}
                        </td>

                        <td>
                            ${row["Listing Price (Incl. taxes)"] || ""}
                        </td>

                        <td>
                            ${row["Quantity"] || ""}
                        </td>

                        <td>
                            ${row["Total Sale Amount (Incl. Shipping & GST)"] || ""}
                        </td>

                        <td>
                            ${row["Shipping Charge (Incl. GST)"] || ""}
                        </td>

                        <td>
                            ${row["TCS"] || ""}
                        </td>

                        <td>
                            ${row["TDS"] || ""}
                        </td>

                    </tr>

                `).join("")}

                </tbody>

            </table>

            </div>

            `;

        }

    }

});