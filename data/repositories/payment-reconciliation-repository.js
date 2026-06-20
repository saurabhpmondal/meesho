window.MAP = window.MAP || {};

window.MAP.PaymentReconciliationRepository = {

    REQUIRED_HEADERS: [

        "Sub Order No",
        "Supplier SKU",
        "Catalog ID",
        "Live Order Status",
        "Listing Price (Incl. taxes)",
        "Quantity",
        "Transaction ID",
        "Final Settlement Amount",
        "Total Sale Amount (Incl. Shipping & GST)",
        "Shipping Charge (Incl. GST)",
        "TCS",
        "TDS"

    ],

    validateHeaders(rows){

        if(
            !rows ||
            !rows.length
        ){
            throw new Error(
                "No data found"
            );
        }

        const headers =
            Object.keys(
                rows[0]
            );

        const missing =
            this.REQUIRED_HEADERS
            .filter(
                header =>
                    !headers.includes(
                        header
                    )
            );

        if(
            missing.length
        ){

            throw new Error(

                "Missing Headers : " +

                missing.join(", ")

            );

        }

        return true;

    },

    verify(rows){

        this.validateHeaders(
            rows
        );

        const report = [];

        let totalRows = 0;
        let verifiedRows = 0;
        let matchedRows = 0;
        let higherPayoutRows = 0;
        let lowerPayoutRows = 0;
        let skuNotFoundRows = 0;

        rows.forEach(row => {

            totalRows++;

            const supplierSku =

                String(

                    row[
                        "Supplier SKU"
                    ] || ""

                ).trim();

            const master =

                window.MAP
                .MasterRepository
                .getBySku(
                    supplierSku
                );

            if(!master){

                skuNotFoundRows++;

                report.push({

                    status:
                        "SKU NOT FOUND",

                    difference:
                        "",

                    expectedSettlement:
                        "",

                    actualSettlement:

                        Number(

                            row[
                                "Final Settlement Amount"
                            ] || 0

                        ),

                    ...row

                });

                return;

            }

            verifiedRows++;

            const pricing =

                window.MAP
                .PricingEngine
                .calculatePrice(

                    Number(
                        master.tp || 0
                    ),

                    Number(
                        master.shipping || 0
                    ),

                    master.erp_status || "",

                    "Big Event"

                );

            if(
                !pricing
            ){

                skuNotFoundRows++;

                report.push({

                    status:
                        "PRICING ERROR",

                    difference:
                        "",

                    expectedSettlement:
                        "",

                    actualSettlement:

                        Number(

                            row[
                                "Final Settlement Amount"
                            ] || 0

                        ),

                    ...row

                });

                return;

            }

            const expectedSettlement =

                Number(

                    pricing
                    .result
                    .bankSettlement || 0

                );

            const actualSettlement =

                Number(

                    row[
                        "Final Settlement Amount"
                    ] || 0

                );

            const difference =

                actualSettlement -

                expectedSettlement;

            let status =
                "MATCH";

            if(
                difference > 1
            ){

                status =
                    "HIGHER PAYOUT";

                higherPayoutRows++;

            }
            else if(
                difference < -1
            ){

                status =
                    "LOWER PAYOUT";

                lowerPayoutRows++;

            }
            else{

                matchedRows++;

            }

            report.push({

                status,

                expectedSettlement,

                actualSettlement,

                difference,

                ...row

            });

        });

        report.sort((a,b)=>{

            const order = {

                "LOWER PAYOUT": 1,

                "HIGHER PAYOUT": 2,

                "SKU NOT FOUND": 3,

                "MATCH": 4

            };

            return (

                order[
                    a.status
                ] || 999

            ) -

            (

                order[
                    b.status
                ] || 999

            );

        });

        return {

            summary: {

                totalRows,

                verifiedRows,

                matchedRows,

                higherPayoutRows,

                lowerPayoutRows,

                skuNotFoundRows

            },

            report

        };

    }

};