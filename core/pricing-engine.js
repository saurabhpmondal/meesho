window.MAP = window.MAP || {};

window.MAP.PricingEngine = {

    getTargetMultiplier(
        erpStatus,
        scenario
    ){

        const status =
            String(
                erpStatus || ""
            ).trim();

        if(
            status === "Continue"
        ){

            if(
                scenario === "BAU"
            ){
                return 0.90;
            }

            if(
                scenario === "Small Event"
            ){
                return 0.85;
            }

            if(
                scenario === "Big Event"
            ){
                return 0.83;
            }

            return 0.90;

        }

        if(
            scenario === "BAU"
        ){
            return 0.80;
        }

        if(
            scenario === "Small Event"
        ){
            return 0.60;
        }

        if(
            scenario === "Big Event"
        ){
            return 0.60;
        }

        return 0.80;

    },

    calculatePrice(

        tp,

        shipping,

        erpStatus,

        scenario = "BAU",

        debug = false

    ){

        tp =
            Number(tp || 0);

        shipping =
            Number(
                shipping || 0
            );

        const debugRows = [];

        const targetMultiplier =
            this.getTargetMultiplier(
                erpStatus,
                scenario
            );

        const targetPayout =
            tp *
            targetMultiplier;

        let bestResult = null;
        let bestGap = Infinity;

        for(

            let sp = 1;

            sp <= 3000;

            sp++

        ){

            const csp =
                sp +
                shipping;

            const baseSP =
                sp / 1.05;

            const baseShipping =
                shipping / 1.05;

            const taxOnShipping =
                baseShipping *
                0.05;

            const baseCSP =
                csp / 1.05;

            const taxOnCSP =
                baseCSP *
                0.05;

            const tcs =
                baseCSP *
                0.005;

            const tds =
                baseCSP *
                0.001;

            const shippingWithTax =
                baseShipping *
                1.18;

            const bankSettlement =

                csp

                -

                shippingWithTax

                -

                tcs

                -

                tds;

            const marketing =
                csp *
                0.03;

            const packing =
                20;

            const returnCharges =
                165;

            const returnPercent =
                30;

            const returnCODB =

                (
                    returnCharges *
                    returnPercent
                )

                /

                (
                    100 -
                    returnPercent
                );

            const totalCODB =

                marketing

                +

                packing

                +

                returnCODB;

            const payoutAfterCODB =

                bankSettlement

                -

                totalCODB;

            const diff =

                payoutAfterCODB

                -

                tp;

            const tpMarginPercent =

                tp > 0

                ?

                (
                    diff /
                    tp
                )

                :

                0;

            const gap =

                payoutAfterCODB

                -

                targetPayout;

            const pass =

                payoutAfterCODB

                >=

                targetPayout;

            const row = {

                erpStatus,

                scenario,

                tp,

                targetPayout,

                shipping,

                sp,

                csp,

                baseSP,

                baseShipping,

                taxOnShipping,

                baseCSP,

                taxOnCSP,

                tcs,

                tds,

                shippingWithTax,

                bankSettlement,

                marketing,

                packing,

                returnCharges,

                returnPercent,

                returnCODB,

                totalCODB,

                payoutAfterCODB,

                diff,

                tpMarginPercent,

                pass

            };

            if(
                debug
            ){
                debugRows.push(
                    row
                );
            }

            if(

                pass &&

                gap < bestGap

            ){

                bestGap =
                    gap;

                bestResult = {

                    recommendedSP:
                        sp,

                    result:
                        row

                };

            }

        }

        if(
            bestResult
        ){

            return {

                recommendedSP:
                    bestResult
                    .recommendedSP,

                result:
                    bestResult
                    .result,

                debugRows

            };

        }

        return null;

    }

};