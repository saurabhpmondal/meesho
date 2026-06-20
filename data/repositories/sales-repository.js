window.MAP = window.MAP || {};

window.MAP.SalesRepository = {

    getRows(){

        return (
            window.MAP.DataStore
            .sales || []
        );

    },

    getUnits(){

        return this
            .getRows()
            .reduce(

                (sum,row)=>

                    sum +

                    Number(
                        row.quantity || 0
                    ),

                0

            );

    },

    getGMV(){

        return this
            .getRows()
            .reduce(

                (sum,row)=>

                    sum +

                    Number(
                        row[
                        "supplier_discounted_price_(incl_gst_and_commision)"
                        ] || 0
                    ),

                0

            );

    },

    getASP(){

        const units =
            this.getUnits();

        if(!units){
            return 0;
        }

        return (
            this.getGMV() /
            units
        );

    }

};
