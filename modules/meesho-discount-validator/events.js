window.MAP = window.MAP || {};

window.MAP.MeeshoDiscountValidatorEvents = {

    uploadedRows:[],

    result:null,

    bind(){

        this.bindSampleDownload();

        this.bindUpload();

        this.bindGenerate();

    },

    bindSampleDownload(){

        const btn =

            document.getElementById(
                "downloadSampleBtn"
            );

        if(!btn){
            return;
        }

        btn.onclick = ()=>{

            const rows = [

                {

                    "Product ID":"",
                    "Meesho Price Before Discount":"",
                    "Min Discount":""

                }

            ];

            const ws =

                XLSX.utils
                .json_to_sheet(
                    rows
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

        };

    },

    bindUpload(){

        const input =

            document.getElementById(
                "discountValidatorFile"
            );

        if(!input){
            return;
        }

        input.onchange =

            async ()=>{

                const file =

                    input.files[0];

                if(!file){
                    return;
                }

                const buffer =

                    await file
                    .arrayBuffer();

                const workbook =

                    XLSX.read(

                        buffer,

                        {

                            type:"array"

                        }

                    );

                const sheet =

                    workbook
                    .Sheets[
                        workbook
                        .SheetNames[0]
                    ];

                this.uploadedRows =

                    XLSX.utils
                    .sheet_to_json(
                        sheet
                    );

                const validation =

                    window.MAP
                    .MeeshoDiscountValidatorRepository
                    .validateFile(

                        this.uploadedRows

                    );

                if(
                    !validation.success
                ){

                    alert(
                        validation.message
                    );

                    return;

                }

                document
                .getElementById(
                    "uploadedFileInfo"
                )
                .innerHTML =

                    `✔ ${file.name}
                    <br>
                    ${this.uploadedRows.length}
                    rows detected`;

                document
                .getElementById(
                    "summarySection"
                )
                .style.display =
                    "block";

                document
                .getElementById(
                    "foundCard"
                )
                .innerHTML =

                    window.MAP
                    .MeeshoDiscountValidatorUI
                    .renderFoundCard(

                        validation.found

                    );

                document
                .getElementById(
                    "notFoundCard"
                )
                .innerHTML =

                    window.MAP
                    .MeeshoDiscountValidatorUI
                    .renderNotFoundCard(

                        validation.notFound

                    );

                document
                .getElementById(
                    "generateSection"
                )
                .style.display =
                    "block";

            };

    },

    bindGenerate(){

        const btn =

            document.getElementById(
                "generateDiscountBtn"
            );

        if(!btn){
            return;
        }

        btn.onclick = ()=>{

            btn.disabled = true;

            btn.innerHTML =

                "⏳ Validating...";

            const startTime =

                performance.now();

            setTimeout(()=>{

                this.result =

                    window.MAP
                    .MeeshoDiscountValidatorRepository
                    .generate(

                        this.uploadedRows

                    );

                let eligible = 0;

                let notEligible = 0;

                let notFound = 0;

                this.result.forEach(row=>{

                    switch(

                        row.Eligibility

                    ){

                        case "Eligible":

                            eligible++;

                            break;

                        case "Not Eligible":

                            notEligible++;

                            break;

                        default:

                            notFound++;

                            break;

                    }

                });

                const total =

                    this.result.length;

                const endTime =

                    performance.now();

                const processingTime =

                    (

                        endTime -

                        startTime

                    ).toFixed(2);

                window.MAP
                .MeeshoDiscountValidatorUI
                .renderSuccess({

                    eligible,

                    notEligible,

                    notFound,

                    total,

                    processingTime

                });

                const downloadBtn =

                    document.getElementById(
                        "downloadResultBtn"
                    );

                downloadBtn.onclick =

                    ()=>{

                        this.downloadResult();

                    };

                btn.disabled = false;

                btn.innerHTML =

                    "⚡ Generate Validation";

            },200);

        };

    },

    downloadResult(){

        const ws =

            XLSX.utils
            .json_to_sheet(

                this.result

            );

        const wb =

            XLSX.utils
            .book_new();

        XLSX.utils
        .book_append_sheet(

            wb,

            ws,

            "Validation"

        );

        const now =

            new Date();

        const fileName =

            "Meesho_Discount_Validator_" +

            now.getFullYear() +

            String(

                now.getMonth()+1

            ).padStart(2,"0") +

            String(

                now.getDate()

            ).padStart(2,"0") +

            "_" +

            String(

                now.getHours()

            ).padStart(2,"0") +

            String(

                now.getMinutes()

            ).padStart(2,"0") +

            ".xlsx";

        XLSX.writeFile(

            wb,

            fileName

        );

    }

};