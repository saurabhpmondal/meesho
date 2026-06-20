window.MAP = window.MAP || {};

window.MAP.PricingRepository = {

    getRows(

        scenario = "BAU"

    ){

        const masterRows =
            window.MAP.DataStore.master || [];

        return masterRows.map(row => {

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
                    r.shipping,

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

    }

};