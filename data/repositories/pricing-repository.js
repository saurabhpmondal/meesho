window.MAP = window.MAP || {};

window.MAP.PricingRepository = {

    cachedRows: [],

    lastScenario: "BAU",

    generating: false,

    clearCache(){

        this.cachedRows = [];

    },

    getStatuses(){

        const masterRows =
            window.MAP.DataStore.master || [];

        const statuses = [
            ...new Set(
                masterRows
                .map(
                    row =>
                    String(
                        row.erp_status || ""
                    ).trim()
                )
                .filter(Boolean)
            )
        ];

        statuses.sort();

        return statuses;

    },

    async generate(

        scenario = "BAU",

        progressCallback = null

    ){

        this.generating = true;

        this.cachedRows = [];

        this.lastScenario =
            scenario;

        const masterRows =
            window.MAP.DataStore.master || [];

        const total =
            masterRows.length;

        const rows = [];

        for(

            let i = 0;

            i < total;

            i++

        ){

            const row =
                masterRows[i];

            const pricing =

                window.MAP
                .PricingEngine
                .calculatePrice(

                    Number(
                        row.tp || 0
                    ),

                    Number(
                        row.shipping || 0
                    ),

                    row.erp_status || "",

                    scenario

                );

            if(pricing){

                const r =
                    pricing.result;

                const currentSP =
                    Number(
                        row.current_sp || 0
                    );

                const recommendedSP =
                    Number(
                        r.sp || 0
                    );

                const spDiff =
                    recommendedSP -
                    currentSP;

                const spDiffPercent =

                    currentSP > 0

                    ?

                    (
                        spDiff /
                        currentSP
                    ) * 100

                    :

                    0;

                rows.push({

                    erp_launch_date:
                        row.erp_launch_date || "",

                    brand:
                        row.brand || "",

                    category:
                        row.category || "",

                    catalog_id:
                        row.catalog_id || "",

                    style_id:
                        row.style_id || "",

                    sellersku:
                        row.sellersku || "",

                    erpsku:
                        row.erpsku || "",

                    product_id:
                        row.product_id || "",

                    erp_status:
                        row.erp_status || "",

                    current_sp:
                        currentSP,

                    sp:
                        recommendedSP,

                    sp_diff:
                        spDiff,

                    sp_diff_percent:
                        spDiffPercent,

                    csp:
                        r.csp,

                    shipping:
                        Number(
                            row.shipping || 0
                        ),

                    base_sp:
                        r.baseSP,

                    base_shipping:
                        r.baseShipping,

                    tax_on_shipping:
                        r.taxOnShipping,

                    base_csp:
                        r.baseCSP,

                    tax_on_csp:
                        r.taxOnCSP,

                    tcs:
                        r.tcs,

                    tds:
                        r.tds,

                    shipping_with_tax:
                        r.shippingWithTax,

                    bank_settlement:
                        r.bankSettlement,

                    marketing:
                        r.marketing,

                    packing:
                        r.packing,

                    return_charges:
                        r.returnCharges,

                    return_percent:
                        r.returnPercent,

                    return_codb:
                        r.returnCODB,

                    total_codb:
                        r.totalCODB,

                    payout_after_codb:
                        r.payoutAfterCODB,

                    tp:
                        r.tp,

                    diff:
                        r.diff,

                    tp_margin_percent:
                        r.tpMarginPercent * 100

                });

            }

            if(

                progressCallback &&

                (
                    i % 100 === 0 ||

                    i === total - 1
                )

            ){

                progressCallback({

                    processed:
                        i + 1,

                    total,

                    percent:

                        Math.round(

                            (
                                (i + 1)

                                /

                                total

                            ) * 100

                        )

                });

                await new Promise(
                    resolve =>
                    setTimeout(
                        resolve,
                        0
                    )
                );

            }

        }

        this.cachedRows =
            rows;

        this.generating =
            false;

        return rows;

    },

    getCachedRows(

        erpStatus = "All",

        search = ""

    ){

        let rows =
            [...this.cachedRows];

        if(

            erpStatus !== "All"

        ){

            rows =

                rows.filter(

                    row =>

                        row.erp_status ===
                        erpStatus

                );

        }

        const searchText =

            String(
                search || ""
            )

            .trim()

            .toLowerCase();

        if(searchText){

            rows =

                rows.filter(row => {

                    const blob = [

                        row.style_id,
                        row.sellersku,
                        row.erpsku,
                        row.catalog_id,
                        row.product_id

                    ]
                    .join(" ")
                    .toLowerCase();

                    return blob.includes(
                        searchText
                    );

                });

        }

        return rows;

    },

    getTopRows(

        rows,

        limit = 100

    ){

        return rows.slice(
            0,
            limit
        );

    },

    getKpis(rows){

        const count =
            rows.length;

        return {

            totalStyles:
                count,

            avgTP:

                count

                ?

                rows.reduce(

                    (sum,row)=>

                        sum +

                        Number(
                            row.tp || 0
                        ),

                    0

                )

                /

                count

                :

                0,

            avgSP:

                count

                ?

                rows.reduce(

                    (sum,row)=>

                        sum +

                        Number(
                            row.sp || 0
                        ),

                    0

                )

                /

                count

                :

                0,

            avgMargin:

                count

                ?

                rows.reduce(

                    (sum,row)=>

                        sum +

                        Number(
                            row.tp_margin_percent || 0
                        ),

                    0

                )

                /

                count

                :

                0

        };

    },

    exportCSV(rows){

        if(
            !rows.length
        ){
            return;
        }

        const headers =
            Object.keys(
                rows[0]
            );

        const csv = [

            headers.join(","),

            ...rows.map(row =>

                headers.map(key =>

                    `"${String(
                        row[key] ?? ""
                    ).replaceAll(
                        `"`,
                        `""`
                    )}"`

                ).join(",")

            )

        ].join("\n");

        const blob =
            new Blob(

                [csv],

                {
                    type:
                    "text/csv;charset=utf-8;"
                }

            );

        const url =
            URL.createObjectURL(
                blob
            );

        const a =
            document.createElement(
                "a"
            );

        a.href = url;

        a.download =
            "pricing_export.csv";

        document.body.appendChild(
            a
        );

        a.click();

        document.body.removeChild(
            a
        );

        URL.revokeObjectURL(
            url
        );

    }

};