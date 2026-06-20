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
                    new Date(
                        fromDate
                    );

                const to =
                    new Date(
                        toDate
                    );

                to.setHours(
                    23,59,59,999
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
                row.catalog_id

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

        const parts =
            String(value)
            .split("/");

        if(parts.length !== 3){
            return null;
        }

        const month =
            Number(parts[0]) - 1;

        const day =
            Number(parts[1]);

        const year =
            Number(parts[2]);

        return new Date(
            year,
            month,
            day
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

                (sum,row)=>{

                    const value =
                        Number(
                            row[
                                "supplier_listed_price_(incl._gst_+_commission)"
                            ] || 0
                        );

                    return (
                        sum + value
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