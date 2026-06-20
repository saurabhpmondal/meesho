window.MAP = window.MAP || {};

window.MAP.FlexiGrowthRepository = {

    findStyle(styleId){

        const masterRows =
            window.MAP.DataStore.master || [];

        const searchValue =
            String(styleId || "")
            .trim()
            .toLowerCase();

        return masterRows.find(row =>

            String(
                row.style_id || ""
            )
            .trim()
            .toLowerCase()

            ===

            searchValue

        ) || null;

    },

    evaluate(

        styleId,

        currentSP

    ){

        const row =
            this.findStyle(
                styleId
            );

        if(!row){
            return null;
        }

        currentSP =
            Number(
                currentSP || 0
            );

        const tp =
            Number(
                row.tp || 0
            );

        const shipping =
            Number(
                row.shipping || 0
            );

        const erpStatus =
            row.erp_status || "";

        const bauPricing =

            window.MAP
            .PricingEngine
            .calculatePrice(

                tp,

                shipping,

                erpStatus,

                "BAU"

            );

        const bigEventPricing =

            window.MAP
            .PricingEngine
            .calculatePrice(

                tp,

                shipping,

                erpStatus,

                "Big Event"

            );

        const bauSP =
            Number(
                bauPricing
                ?.recommendedSP || 0
            );

        const bigEventSP =
            Number(
                bigEventPricing
                ?.recommendedSP || 0
            );

        let minDiscount =

            Math.floor(

                (

                    (
                        currentSP -

                        bauSP

                    )

                    /

                    currentSP

                )

                * 100

            );

        let maxDiscount =

            Math.floor(

                (

                    (
                        currentSP -

                        bigEventSP

                    )

                    /

                    currentSP

                )

                * 100

            );

        if(
            minDiscount < 0
        ){
            minDiscount =
                null;
        }

        if(
            maxDiscount < 0
        ){
            maxDiscount = 0;
        }

        return {

            style_id:
                row.style_id,

            product_id:
                row.product_id,

            erpsku:
                row.erpsku,

            erp_status:
                row.erp_status,

            current_sp:
                currentSP,

            min_discount:
                minDiscount,

            max_discount:
                maxDiscount,

            eligible:
                maxDiscount > 0

        };

    }

};