window.MAP = window.MAP || {};

window.MAP.PricingRepository = {

    getStatuses(){

        const masterRows =
            window.MAP.DataStore.master || [];

        const statuses =
            [
                ...new Set(

                    masterRows
                    .map(
                        x =>
                        String(
                            x.erp_status || ""
                        ).trim()
                    )
                    .filter(Boolean)

                )
            ];

        statuses.sort();

        return statuses;

    },

    getRows(

        scenario = "BAU",

        erpStatus = "All",

        search = ""

    ){

        const masterRows =
            window.MAP.DataStore.master || [];

        const searchText =
            String(
                search || ""
            )
            .trim()
            .toLowerCase();

        return masterRows

            .filter(row => {

                if(
                    erpStatus !== "All" &&
                    String(
                        row.erp_status || ""
                    ).trim() !== erpStatus
                ){
                    return false;
                }

                if(
                    !searchText
                ){
                    return true;
                }

                const searchBlob = [

                    row.style_id,
                    row.erpsku,
                    row.sellersku,
                    row.catalog_id,
                    row.product_id

                ]
                .join(" ")
                .toLowerCase();

                return searchBlob.includes(
                    searchText
                );

            })

            .map(row => {

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

                if(
                    !pricing
                ){
                    return null;
                }

                const r =
                    pricing.result;

                return {

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

                    csp:
                        r.csp,

                    sp:
                        r.sp,

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

                    calc_payout:
                        r.targetPayout,

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

                };

            })

            .filter(Boolean);

    },

    getKpis(rows){

        const totalStyles =
            rows.length;

        const avgTP =

            totalStyles

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

            totalStyles

            :

            0;

        const avgSP =

            totalStyles

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

            totalStyles

            :

            0;

        const avgMargin =

            totalStyles

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

            totalStyles

            :

            0;

        return {

            totalStyles,

            avgTP,

            avgSP,

            avgMargin

        };

    },

    exportCSV(rows){

        if(
            !rows ||
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

                headers.map(key => {

                    const value =
                        row[key];

                    return `"${String(
                        value ?? ""
                    ).replaceAll(
                        `"`,
                        `""`
                    )}"`;

                }).join(",")

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

        const link =
            document.createElement(
                "a"
            );

        link.href = url;

        link.download =
            `pricing_export.csv`;

        document.body.appendChild(
            link
        );

        link.click();

        document.body.removeChild(
            link
        );

        URL.revokeObjectURL(
            url
        );

    }

};