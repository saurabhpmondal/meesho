window.MAP = window.MAP || {};

window.MAP.AdsRepository = {

    getRows(){

        const rows =
            window.MAP.DataStore
            .ads || [];

        const fromDate =
            window.MAP.FilterState
            .getFromDate();

        if(!fromDate){
            return rows;
        }

        const date =
            new Date(
                fromDate
            );

        const month =
            date.getMonth() + 1;

        const year =
            date.getFullYear();

        return rows.filter(row => {

            return (

                Number(
                    row.month
                ) === month

                &&

                Number(
                    row.year
                ) === year

            );

        });

    },

    cleanNumber(value){

        if(
            value === null ||
            value === undefined
        ){
            return 0;
        }

        return Number(
            String(value)
            .replace(/,/g,"")
            .replace(/₹/g,"")
            .trim()
        ) || 0;

    },

    getAdSpend(){

        return this
            .getRows()
            .reduce(

                (sum,row)=>

                    sum +

                    this.cleanNumber(
                        row.ads_spend
                    ),

                0

            );

    },

    getRevenue(){

        return this
            .getRows()
            .reduce(

                (sum,row)=>

                    sum +

                    this.cleanNumber(
                        row.revenue
                    ),

                0

            );

    },

    getROI(){

        const spend =
            this.getAdSpend();

        if(!spend){
            return 0;
        }

        const gmv =
            window.MAP
            .SalesRepository
            .getGMV();

        return (
            gmv / spend
        );

    }

};