window.MAP = window.MAP || {};

window.MAP.ModuleManager.register({

    id: "meesho-discount-validator",

    title: "Meesho Discount Validator",

    featureFlag: "pricing",

    permission: "pricing_view",

    showSearch: false,

    showFilters: false,

    render(container){

        let uploadedRows = [];

        let processedResult = null;

        container.innerHTML = `

        <div class="dashboard-page">

            <div class="dashboard-report-card">

                <div
                    style="
                        display:flex;
                        justify-content:space-between;
                        align-items:center;
                        margin-bottom:24px;
                    "
                >

                    <div>

                        <h2>
                            Meesho Discount Validator
                        </h2>

                        <div
                            class="dashboard-subtitle"
                        >
                            Validate Meesho requested discount using Pricing Engine.
                        </div>

                    </div>

                    <button
                        id="downloadSampleBtn"
                    >
                        Download Sample CSV
                    </button>

                </div>

                <div
                    style="
                        background:#f8fafc;
                        border:2px dashed #cbd5e1;
                        border-radius:16px;
                        padding:32px;
                        text-align:center;
                        margin-bottom:24px;
                    "
                >

                    <input

                        id="discountValidatorFile"

                        type="file"

                        accept=".csv"

                    >

                    <div
                        style="
                            margin-top:14px;
                            color:#64748b;
                            font-size:14px;
                        "
                    >

                        Upload CSV file containing

                        <b>

                            Product ID,

                            Meesho Price Before Discount,

                            Min Discount

                        </b>

                    </div>

                </div>

                <div

                    id="discountSummary"

                    style="
                        display:grid;
                        grid-template-columns:
                            repeat(
                                2,
                                1fr
                            );
                        gap:16px;
                        margin-bottom:24px;
                    "

                >

                    <div
                        class="kpi-card"
                        style="
                            border-left:5px solid #16a34a;
                        "
                    >

                        <div
                            class="kpi-label"
                        >
                            Product Found
                        </div>

                        <div

                            class="kpi-value"

                            id="foundCount"

                        >

                            0

                        </div>

                    </div>

                    <div
                        class="kpi-card"
                        style="
                            border-left:5px solid #dc2626;
                        "
                    >

                        <div
                            class="kpi-label"
                        >
                            Product Not Found
                        </div>

                        <div

                            class="kpi-value"

                            id="notFoundCount"

                        >

                            0

                        </div>

                    </div>

                </div>

                <div

                    style="
                        display:flex;
                        gap:12px;
                    "

                >

                    <button

                        id="generateDiscountBtn"

                        disabled

                    >

                        Generate Result

                    </button>

                    <button

                        id="downloadResultBtn"

                        disabled

                    >

                        Download Result

                    </button>

                </div>

            </div>

        </div>

        `;

        const uploadInput =
            document.getElementById(
                "discountValidatorFile"
            );

        const sampleBtn =
            document.getElementById(
                "downloadSampleBtn"
            );

        const generateBtn =
            document.getElementById(
                "generateDiscountBtn"
            );

        const downloadBtn =
            document.getElementById(
                "downloadResultBtn"
            );