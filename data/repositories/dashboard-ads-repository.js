window.MAP = window.MAP || {};

window.MAP.DashboardAdsRepository = {

    getLast6Months(){

        const rows =
            window.MAP.DataStore
            .ads || [];

        const result =
            rows.map(row => {

                const views =
                    Number(
                        String(
                            row.views || 0
                        ).replaceAll(",","")
                    );

                const clicks =
                    Number(
                        String(
                            row.clicks || 0
                        ).replaceAll(",","")
                    );

                const orders =
                    Number(
                        String(
                            row.orders || 0
                        ).replaceAll(",","")
                    );

                const adSpend =
                    Number(
                        String(
                            row.ads_spend || 0
                        ).replaceAll(",","")
                    );

                const revenue =
                    Number(
                        String(
                            row.revenue || 0
                        ).replaceAll(",","")
                    );

                const ctr =
                    views
                    ?
                    (clicks / views) * 100
                    :
                    0;

                const cvr =
                    clicks
                    ?
                    (orders / clicks) * 100
                    :
                    0;

                return {

                    month:
                        Number(row.month),

                    year:
                        Number(row.year),

                    monthYear:
                        this.getMonthName(
                            Number(row.month)
                        ) +
                        "-" +
                        row.year,

                    views,

                    clicks,

                    orders,

                    adSpend,

                    revenue,

                    ctr,

                    cvr,

                    roi:
                        Number(
                            row.roi || 0
                        )

                };

            });

        result.sort((a,b)=>{

            const keyA =
                (a.year * 100)
                + a.month;

            const keyB =
                (b.year * 100)
                + b.month;

            return keyB - keyA;

        });

        return result.slice(0,6);

    },

    getMonthName(month){

        const months = [

            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec"

        ];

        return months[
            month - 1
        ] || month;

    }

};