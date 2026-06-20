window.MAP = window.MAP || {};

window.MAP.DashboardSalesRepository = {

    getDailyPerformance(){

        const rows =
            window.MAP
            .SalesRepository
            .getRows();

        const map = {};

        rows.forEach(row => {

            const date =
                String(
                    row.order_date
                );

            if(!map[date]){

                map[date] = {

                    date,

                    units: 0,

                    gmv: 0

                };

            }

            map[date].units +=
                Number(
                    row.quantity || 0
                );

            map[date].gmv +=
                Number(
                    row[
                        "supplier_listed_price_(incl._gst_+_commission)"
                    ] || 0
                );

        });

        const result =
            Object.values(map)
            .map(x => ({

                date: x.date,

                units: x.units,

                gmv: x.gmv,

                asp:
                    x.units
                    ? x.gmv / x.units
                    : 0

            }));

        result.sort(
            (a,b)=>
                this.getDateKey(a.date)
                -
                this.getDateKey(b.date)
        );

        return result;

    },

    getDateKey(value){

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

    formatDate(value){

        const match =
            String(value)
            .match(
                /Date\((\d+),(\d+),(\d+)\)/
            );

        if(!match){
            return value;
        }

        const year =
            Number(match[1]);

        const month =
            Number(match[2]) + 1;

        const day =
            Number(match[3]);

        return new Date(
            year,
            month - 1,
            day
        ).toLocaleDateString(
            "en-IN",
            {
                day:"2-digit",
                month:"short",
                year:"numeric"
            }
        );

    }

};