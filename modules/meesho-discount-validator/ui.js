window.MAP = window.MAP || {};

window.MAP.MeeshoDiscountValidatorUI = {

    render(container){

        container.innerHTML = `

        <div class="dashboard-page">

            <div
                style="
                    background:linear-gradient(135deg,#4f46e5,#7c3aed);
                    color:#fff;
                    padding:30px;
                    border-radius:18px;
                    margin-bottom:24px;
                    box-shadow:0 12px 35px rgba(79,70,229,.25);
                "
            >

                <div
                    style="
                        font-size:30px;
                        font-weight:700;
                    "
                >

                    Meesho Discount Validator

                </div>

                <div
                    style="
                        margin-top:8px;
                        opacity:.9;
                        font-size:15px;
                    "
                >

                    Validate Meesho requested discounts using the Pricing Engine.

                </div>

            </div>

            <div
                class="dashboard-report-card"
            >

                <div
                    style="
                        display:flex;
                        justify-content:space-between;
                        align-items:center;
                        flex-wrap:wrap;
                        gap:20px;
                    "
                >

                    <div>

                        <h3>

                            Upload Discount File

                        </h3>

                        <div
                            style="
                                color:#64748b;
                                margin-top:4px;
                            "
                        >

                            Upload XLSX downloaded from your planning sheet.

                        </div>

                    </div>

                    <button
                        id="downloadSampleBtn"
                        style="
                            background:#fff;
                            color:#4f46e5;
                            border:2px solid #4f46e5;
                            padding:12px 22px;
                            border-radius:12px;
                            cursor:pointer;
                            font-weight:600;
                        "
                    >

                        Download Sample

                    </button>

                </div>

                <div
                    id="uploadZone"
                    style="
                        margin-top:25px;
                        border:3px dashed #cbd5e1;
                        border-radius:18px;
                        padding:50px;
                        text-align:center;
                        transition:.3s;
                        background:#f8fafc;
                    "
                >

                    <div
                        style="
                            font-size:60px;
                        "
                    >

                        📄

                    </div>

                    <div
                        style="
                            font-size:20px;
                            font-weight:600;
                            margin-top:10px;
                        "
                    >

                        Drag & Drop XLSX Here

                    </div>

                    <div
                        style="
                            color:#64748b;
                            margin-top:8px;
                        "
                    >

                        or choose a file manually

                    </div>

                    <input
                        id="discountValidatorFile"
                        type="file"
                        accept=".xlsx"
                        style="
                            margin-top:25px;
                        "
                    >

                    <div
                        id="uploadedFileInfo"
                        style="
                            margin-top:18px;
                            color:#16a34a;
                            font-weight:600;
                        "
                    ></div>

                </div>

            </div>

            <div
                id="summarySection"
                style="
                    margin-top:25px;
                    display:none;
                "
            >

                <div
                    style="
                        display:grid;
                        grid-template-columns:repeat(auto-fit,minmax(240px,1fr));
                        gap:18px;
                    "
                >

                    <div
                        id="foundCard"
                    ></div>

                    <div
                        id="notFoundCard"
                    ></div>

                </div>

            </div>

            <div
                id="generateSection"
                style="
                    display:none;
                    margin-top:25px;
                    text-align:center;
                "
            >

                <button
                    id="generateDiscountBtn"
                    style="
                        background:linear-gradient(135deg,#6366f1,#7c3aed);
                        color:white;
                        border:none;
                        padding:16px 34px;
                        border-radius:14px;
                        cursor:pointer;
                        font-size:16px;
                        font-weight:700;
                        box-shadow:0 10px 25px rgba(99,102,241,.25);
                    "
                >

                    ⚡ Generate Validation

                </button>

            </div>

            <div
                id="successSection"
                style="
                    display:none;
                    margin-top:30px;
                "
            >

            </div>

        </div>

        `;

    }

};

    renderFoundCard(count){

        return `

        <div class="kpi-card"
            style="
                border-left:6px solid #22c55e;
                background:linear-gradient(135deg,#f0fdf4,#dcfce7);
            ">

            <div
                style="
                    font-size:13px;
                    color:#166534;
                    text-transform:uppercase;
                    letter-spacing:.5px;
                ">

                ✓ Product Found

            </div>

            <div
                style="
                    font-size:40px;
                    font-weight:700;
                    margin-top:10px;
                    color:#14532d;
                ">

                ${count}

            </div>

            <div
                style="
                    margin-top:8px;
                    color:#166534;
                ">

                Available in Product Master

            </div>

        </div>

        `;

    },

    renderNotFoundCard(count){

        return `

        <div class="kpi-card"
            style="
                border-left:6px solid #ef4444;
                background:linear-gradient(135deg,#fef2f2,#fee2e2);
            ">

            <div
                style="
                    font-size:13px;
                    color:#991b1b;
                    text-transform:uppercase;
                    letter-spacing:.5px;
                ">

                ✕ Product Not Found

            </div>

            <div
                style="
                    font-size:40px;
                    font-weight:700;
                    margin-top:10px;
                    color:#991b1b;
                ">

                ${count}

            </div>

            <div
                style="
                    margin-top:8px;
                    color:#991b1b;
                ">

                Ignored during validation

            </div>

        </div>

        `;

    },

    renderSuccess(summary){

        document
        .getElementById(
            "successSection"
        )
        .style.display = "block";

        document
        .getElementById(
            "successSection"
        )
        .innerHTML = `

        <div
            class="dashboard-report-card"
            style="
                border:2px solid #22c55e;
                background:#f0fdf4;
                animation:fadeIn .3s ease;
            ">

            <div
                style="
                    display:flex;
                    align-items:center;
                    gap:18px;
                ">

                <div
                    style="
                        font-size:56px;
                    ">

                    ✅

                </div>

                <div>

                    <div
                        style="
                            font-size:24px;
                            font-weight:700;
                            color:#166534;
                        ">

                        Validation Completed

                    </div>

                    <div
                        style="
                            margin-top:6px;
                            color:#166534;
                        ">

                        Your report is ready for download.

                    </div>

                </div>

            </div>

            <div
                style="
                    display:grid;
                    grid-template-columns:repeat(auto-fit,minmax(180px,1fr));
                    gap:16px;
                    margin-top:28px;
                ">

                ${this.smallCard(
                    "Eligible",
                    summary.eligible,
                    "#22c55e"
                )}

                ${this.smallCard(
                    "Not Eligible",
                    summary.notEligible,
                    "#ef4444"
                )}

                ${this.smallCard(
                    "Not Found",
                    summary.notFound,
                    "#f59e0b"
                )}

                ${this.smallCard(
                    "Processed",
                    summary.total,
                    "#4f46e5"
                )}

            </div>

            <div
                style="
                    text-align:center;
                    margin-top:28px;
                ">

                <button
                    id="downloadResultBtn"
                    style="
                        background:linear-gradient(135deg,#16a34a,#15803d);
                        color:white;
                        border:none;
                        padding:16px 36px;
                        border-radius:14px;
                        font-size:16px;
                        font-weight:700;
                        cursor:pointer;
                        box-shadow:0 12px 25px rgba(22,163,74,.25);
                    ">

                    ⬇ Download Excel Report

                </button>

            </div>

        </div>

        `;

    },

    smallCard(title,value,color){

        return `

        <div
            style="
                background:white;
                border-radius:14px;
                padding:20px;
                border-top:5px solid ${color};
                text-align:center;
            ">

            <div
                style="
                    color:#64748b;
                    font-size:13px;
                ">

                ${title}

            </div>

            <div
                style="
                    font-size:34px;
                    font-weight:700;
                    margin-top:10px;
                    color:${color};
                ">

                ${value}

            </div>

        </div>

        `;

    }

};