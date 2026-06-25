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

        sampleBtn.addEventListener(

            "click",

            () => {

                const sample = [

                    {

                        "Product ID":"123456789",

                        "Meesho Price Before Discount":"999",

                        "Min Discount":"8"

                    }

                ];

                const ws =

                    XLSX.utils
                    .json_to_sheet(
                        sample
                    );

                const wb =

                    XLSX.utils
                    .book_new();

                XLSX.utils
                .book_append_sheet(

                    wb,

                    ws,

                    "Sample"

                );

                XLSX.writeFile(

                    wb,

                    "Meesho_Discount_Validator_Sample.xlsx"

                );

            }

        );

        uploadInput.addEventListener(

            "change",

            async () => {

                try{

                    const file =

                        uploadInput
                        .files[0];

                    if(
                        !file
                    ){
                        return;
                    }

                    const buffer =

                        await file
                        .arrayBuffer();

                    const workbook =

                        XLSX.read(

                            buffer,

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

                    uploadedRows =

                        XLSX.utils
                        .sheet_to_json(

                            worksheet

                        );

                    const validation =

                        window.MAP
                        .MeeshoDiscountValidatorRepository
                        .validateFile(

                            uploadedRows

                        );

                    if(
                        !validation.success
                    ){

                        alert(
                            validation.message
                        );

                        uploadedRows = [];

                        return;

                    }

                    document
                    .getElementById(
                        "foundCount"
                    )
                    .innerHTML =
                        validation
                        .found;

                    document
                    .getElementById(
                        "notFoundCount"
                    )
                    .innerHTML =
                        validation
                        .notFound;

                    generateBtn
                    .disabled =
                        false;

                }

                catch(error){

                    console
                    .error(
                        error
                    );

                    alert(
                        error.message
                    );

                }

            }

        );

        generateBtn.addEventListener(

            "click",

            () => {

                try{

                    processedResult =

                        window.MAP
                        .MeeshoDiscountValidatorRepository
                        .generate(

                            uploadedRows

                        );

                    downloadBtn
                    .disabled =
                        false;

                    alert(

                        "Result generated successfully."

                    );

                }

                catch(error){

                    console
                    .error(
                        error
                    );

                    alert(
                        error.message
                    );

                }

            }

        );


        downloadBtn.addEventListener(

            "click",

            () => {

                try{

                    if(
                        !processedResult
                    ){

                        alert(
                            "Generate result first."
                        );

                        return;

                    }

                    const ws =

                        XLSX.utils
                        .json_to_sheet(

                            processedResult

                        );

                    const wb =

                        XLSX.utils
                        .book_new();

                    XLSX.utils
                    .book_append_sheet(

                        wb,

                        ws,

                        "Discount Validation"

                    );

                    XLSX.writeFile(

                        wb,

                        "Meesho_Discount_Validation_Result.xlsx"

                    );

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

    }

});