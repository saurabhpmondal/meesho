window.MAP = window.MAP || {};

window.MAP.SalesRepository = {

    getRows(){

        let rows =
            window.MAP.DataStore
            .sales || [];

        const search =
            (
                window.MAP.FilterState
                .getSearch() || ""
            )
            .toLowerCase()
            .trim();

        const fromDate =
            window.MAP.FilterState
            .getFromDate();

        const toDate =
            window.MAP.FilterState
            .getToDate();

        rows =
            rows.filter(row => {

                const orderDate =
                    this.parseDate(
                        row.order_date
                    );

                if(!orderDate){
                    return false;
                }

                const from =
                    new Date(fromDate);

                const to =
                    new Date(toDate);

                to.setHours(
                    23,
                    59,
                    59,
                    999
                );

                return (
                    orderDate >= from &&
                    orderDate <= to
                );

            });

        if(!search){

            return rows;

        }

        return rows.filter(row => {

            return [

                row.sku,
                row.catalog_id,
                row.product_name

            ]
            .join(" ")
            .toLowerCase()
            .includes(search);

        });

    },

    parseDate(value){

        if(!value){
            return null;
        }

        const str =
            String(value);

        const match =
            str.match(
                /Date\((\d+),(\d+),(\d+)\)/
            );

        if(match){

            return new Date(

                Number(match[1]),

                Number(match[2]),

                Number(match[3])

            );

        }

        const native =
            new Date(str);

        if(
            !isNaN(
                native.getTime()
            )
        ){
            return native;
        }

        return null;

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

                (sum,row)=>{

                    return (

                        sum +

                        Number(

                            row[
                                "supplier_listed_price_(incl._gst_+_commission)"
                            ] || 0

                        )

                    );

                },

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