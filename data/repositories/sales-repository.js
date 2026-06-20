window.MAP = window.MAP || {};

window.MAP.SalesRepository = {

    getRows(){

        const rows =
            window.MAP.DataStore.sales || [];

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

        const fromKey =
            fromDate
                ? Number(
                    fromDate.replaceAll(
                        "-",
                        ""
                    )
                )
                : 0;

        const toKey =
            toDate
                ? Number(
                    toDate.replaceAll(
                        "-",
                        ""
                    )
                )
                : 99999999;

        let filtered =
            rows.filter(row => {

                const dateKey =
                    this.getDateKey(
                        row.order_date
                    );

                return (
                    dateKey >= fromKey &&
                    dateKey <= toKey
                );

            });

        if(!search){

            return filtered;

        }

        return filtered.filter(row => {

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

    getDateKey(value){

        if(!value){
            return 0;
        }

        const match =
            String(value)
            .match(
                /Date\((\d+),(\d+),(\d+)\)/
            );

        if(!match){
            return 0;
        }

        const year =
            Number(match[1]);

        const month =
            Number(match[2]) + 1;

        const day =
            Number(match[3]);

        return Number(

            String(year) +

            String(month)
                .padStart(2,"0") +

            String(day)
                .padStart(2,"0")

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
                            "supplier_listed_price_(incl._gst_+_commission)"
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