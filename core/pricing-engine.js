window.MAP = window.MAP || {};

window.MAP.PricingEngine = {

    calculatePrice(

        tp,

        shipping,

        erpStatus,

        scenario,

        debug = false

    ){

        const rows = [];

        let targetMultiplier = 1;

        if(
            erpStatus === "Continue"
        ){

            if(scenario === "BAU"){
                targetMultiplier = 0.90;
            }

            if(scenario === "Small Event"){
                targetMultiplier = 0.85;
            }

            if(scenario === "Big Event"){
                targetMultiplier = 0.83;
            }

        }
        else{

            if(scenario === "BAU"){
                targetMultiplier = 0.80;
            }

            if(
                scenario === "Small Event"
            ){
                targetMultiplier = 0.60;
            }

            if(
                scenario === "Big Event"
            ){
                targetMultiplier = 0.60;
            }

        }

        const targetPayout =
            tp *
            targetMultiplier;

        for(

            let sp = Math.ceil(tp);

            sp <= 2000;

            sp++

        ){

            const csp =
                sp +
                shipping;

            const baseSP =
                sp / 1.05;

            const baseShipping =
                shipping / 1.05;

            const shippingTax5 =
                baseShipping *
                0.05;

            const baseCSP =
                csp / 1.05;

            const cspTax5 =
                baseCSP *
                0.05;

            const tcs =
                baseCSP *
                0.005;

            const tds =
                baseCSP *
                0.001;

            const shippingTax18 =
                baseShipping *
                0.18;

            const bankSettlement =

                csp

                -

                shippingTax18

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
                ) * 100

                :

                0;

            const pass =

                payoutAfterCODB

                >=

                targetPayout;

            const result = {

                erpStatus,

                scenario,

                tp,

                targetPayout,

                shipping,

                sp,

                csp,

                baseSP,

                baseShipping,

                shippingTax5,

                baseCSP,

                cspTax5,

                tcs,

                tds,

                shippingTax18,

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

            if(debug){

                rows.push(result);

            }

            if(pass){

                return {

                    recommendedSP:
                        sp,

                    result,

                    debugRows:
                        debug
                        ? rows
                        : []

                };

            }

        }

        return null;

    }

};