window.MAP = window.MAP || {};

window.MAP.AdsRepository = {

    getRows(){

        return (
            window.MAP.DataStore
            .ads || []
        );

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

        const spend =
            this.getAdSpend();

        if(!spend){
            return 0;
        }

        return (
            this.getRevenue() /
            spend
        );

    }

};
