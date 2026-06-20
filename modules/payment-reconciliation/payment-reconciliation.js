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

        <div class="dashboard-header">

            <div>

                <h1>
                    💳 Payment Reconciliation
                </h1>

                <div class="dashboard-subtitle">
                    Verify Meesho Settlement Payouts against Expected Settlement
                </div>

            </div>

        </div>

        <div class="upload-hero-card">

            <div class="upload-icon">
                📄
            </div>

            <div class="upload-title">
                Upload Settlement Report
            </div>

            <div class="upload-subtitle">
                Supports Meesho Settlement XLSX Files
            </div>

            <input
                type="file"
                id="paymentFile"
                accept=".xlsx"
                style="display:none;"
            >

            <button
                id="browseSettlementBtn"
                class="primary-gradient-btn"
            >
                Browse Settlement File
            </button>

            <div
                id="selectedFileName"
                style="
                    margin-top:16px;
                    color:#64748b;
                    font-weight:500;
                "
            >
                No file selected
            </div>

        </div>

        <div
            style="
                display:flex;
                justify-content:center;
                gap:12px;
                margin-top:20px;
            "
        >

            <button
                id="verifyPaymentBtn"
                class="primary-gradient-btn"
            >
                Verify Payments
            </button>

            <button
                id="exportPaymentReportBtn"
                class="success-gradient-btn"
                style="
                    display:none;
                "
            >
                Export Report
            </button>

        </div>

        <div
            id="paymentSummary"
        ></div>

        <div
            id="paymentConcernSummary"
        ></div>

        <div
            id="paymentReport"
        ></div>

    </div>

    `;

    let latestResult = null;

    document
    .getElementById(
        "browseSettlementBtn"
    )
    .addEventListener(

        "click",

        () => {

            document
            .getElementById(
                "paymentFile"
            )
            .click();

        }

    );

    document
    .getElementById(
        "paymentFile"
    )
    .addEventListener(

        "change",

        e => {

            const file =
                e.target.files[0];

            document
            .getElementById(
                "selectedFileName"
            )
            .innerHTML =

                file

                ?

                `✓ ${file.name}`

                :

                "No file selected";

        }

    );

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
                            type:"array"
                        }
                    );

                const sheetName =
                    workbook.SheetNames[0];

                const worksheet =
                    workbook.Sheets[
                        sheetName
                    ];

                const rows =

                    XLSX.utils
                    .sheet_to_json(

                        worksheet,

                        {
                            range:1
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
                    "inline-block";

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
            class="
                payment-kpi-grid
            "
        >

            ${card(
                "Total Rows",
                summary.totalRows,
                "kpi-blue"
            )}

            ${card(
                "Verified",
                summary.verifiedRows,
                "kpi-purple"
            )}

            ${card(
                "Higher Payout",
                summary.higherPayoutRows,
                "kpi-green"
            )}

            ${card(
                "Lower Payout",
                summary.lowerPayoutRows,
                "kpi-red"
            )}

            ${card(
                "SKU Not Found",
                summary.skuNotFoundRows,
                "kpi-orange"
            )}

        </div>

        `;

        document
        .getElementById(
            "paymentConcernSummary"
        )
        .innerHTML = `

        <div
            class="
                payment-alert
            "
        >

            <h3>
                ⚠ Investigation Required
            </h3>

            <div
                style="
                    margin-top:12px;
                    line-height:2;
                "
            >

                Lower Payout :
                <b>
                    ${summary.lowerPayoutRows}
                </b>

                <br>

                Higher Payout :
                <b>
                    ${summary.higherPayoutRows}
                </b>

                <br>

                SKU Not Found :
                <b>
                    ${summary.skuNotFoundRows}
                </b>

            </div>

        </div>

        `;

    }

    function card(

        title,

        value,

        colorClass

    ){

        return `

        <div
            class="
                payment-kpi-card
                ${colorClass}
            "
        >

            <div>

                ${title}

            </div>

            <div
                style="
                    font-size:34px;
                    font-weight:700;
                    margin-top:10px;
                "
            >

                ${value}

            </div>

        </div>

        `;

    }

    function getStatusChip(
        status
    ){

        if(
            status === "MATCH"
        ){

            return `
            <span
                class="
                    status-chip
                    status-match
                "
            >
                🟢 Match
            </span>
            `;

        }

        if(
            status === "HIGHER PAYOUT"
        ){

            return `
            <span
                class="
                    status-chip
                    status-high
                "
            >
                🟢 Higher Payout
            </span>
            `;

        }

        if(
            status === "LOWER PAYOUT"
        ){

            return `
            <span
                class="
                    status-chip
                    status-low
                "
            >
                🔴 Lower Payout
            </span>
            `;

        }

        return `
        <span
            class="
                status-chip
                status-missing
            "
        >
            🟠 SKU Not Found
        </span>
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
            class="
                report-wrapper
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

                            ${getStatusChip(
                                row.status
                            )}

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

                            ₹${Number(
                                row.expectedSettlement || 0
                            ).toFixed(2)}

                        </td>

                        <td>

                            ₹${Number(
                                row.actualSettlement || 0
                            ).toFixed(2)}

                        </td>

                        <td>

                            ₹${Number(
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