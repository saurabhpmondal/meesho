window.MAP = window.MAP || {};

window.MAP.AdsRepository = {

    getRows(){

        const rows =
            window.MAP.DataStore.ads || [];

        const fromDate =
            window.MAP.FilterState
            .getFromDate();

        if(!fromDate){
            return rows;
        }

        const selected =
            new Date(fromDate);

        const month =
            selected.getMonth() + 1;

        const year =
            selected.getFullYear();

        return rows.filter(row => {

            return (

                Number(row.month) === month &&

                Number(row.year) === year

            );

        });

    },

    getAdSpend(){

        return this
            .getRows()
            .reduce(

                (sum,row)=>

                    sum +

                    Number(
                        row.ads_spend || 0
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

                    Number(
                        row.revenue || 0
                    ),

                0

            );

    },

    getROI(){

        const rows =
            this.getRows();

        if(!rows.length){
            return 0;
        }

        return Number(
            rows[0].roi || 0
        );

    }

};