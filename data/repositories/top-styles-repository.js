window.MAP = window.MAP || {};

window.MAP.TopStylesRepository = {

    getRankedStyles(

        rankBy = "units",

        limit = 50

    ){

        const currentRows =
            window.MAP
            .SalesRepository
            .getRows();

        const previousRows =
            this.getPreviousMonthRows();

        const currentMap =
            this.buildStyleMap(
                currentRows
            );

        const previousMap =
            this.buildStyleMap(
                previousRows
            );

        const currentRankMap =
            this.buildRankMap(
                currentMap,
                rankBy
            );

        const previousRankMap =
            this.buildRankMap(
                previousMap,
                rankBy
            );

        const days =
            this.getSelectedDays();

        let result =
            Object.values(
                currentMap
            )
            .map(item => {

                const rank =
                    currentRankMap[
                        item.erpSku
                    ];

                const lastMonthRank =
                    previousRankMap[
                        item.erpSku
                    ] || null;

                return {

                    rank,

                    lastMonthRank,

                    rankChange:

                        lastMonthRank

                        ?

                        (
                            lastMonthRank -
                            rank
                        )

                        :

                        null,

                    isNewEntry:
                        !lastMonthRank,

                    ...item,

                    asp:

                        item.units > 0

                        ?

                        (
                            item.gmv /
                            item.units
                        )

                        :

                        0,

                    drr:

                        days > 0

                        ?

                        (
                            item.units /
                            days
                        )

                        :

                        0

                };

            });

        result.sort((a,b)=>{

            if(
                rankBy === "gmv"
            ){

                return (
                    b.gmv -
                    a.gmv
                );

            }

            return (
                b.units -
                a.units
            );

        });

        if(
            limit !== "all"
        ){

            result =
                result.slice(
                    0,
                    Number(limit)
                );

        }

        return result;

    },

    buildStyleMap(rows){

        const map = {};

        rows.forEach(row => {

            const master =
                window.MAP
                .MasterRepository
                .getBySku(
                    row.sku
                );

            if(!master){
                return;
            }

            const erpSku =
                String(
                    master.erpsku || ""
                ).trim();

            if(!erpSku){
                return;
            }

            if(!map[erpSku]){

                map[erpSku] = {

                    erpSku,

                    erpLaunchDate:
                        master.erp_launch_date || "",

                    erpStatus:
                        master.erp_status || "",

                    units: 0,

                    gmv: 0

                };

            }

            map[erpSku].units +=
                Number(
                    row.quantity || 0
                );

            map[erpSku].gmv +=
                Number(
                    row[
                        "supplier_listed_price_(incl._gst_+_commission)"
                    ] || 0
                );

        });

        return map;

    },

    buildRankMap(

        map,

        rankBy

    ){

        const rows =
            Object.values(map);

        rows.sort((a,b)=>{

            if(
                rankBy === "gmv"
            ){

                return (
                    b.gmv -
                    a.gmv
                );

            }

            return (
                b.units -
                a.units
            );

        });

        const rankMap = {};

        rows.forEach(

            (row,index)=>{

                rankMap[
                    row.erpSku
                ] =
                    index + 1;

            }

        );

        return rankMap;

    },

    getPreviousMonthRows(){

        const fromDate =
            window.MAP
            .FilterState
            .getFromDate();

        if(!fromDate){
            return [];
        }

        const date =
            new Date(
                fromDate
            );

        const previousMonthStart =
            new Date(
                date.getFullYear(),
                date.getMonth() - 1,
                1
            );

        const previousMonthEnd =
            new Date(
                date.getFullYear(),
                date.getMonth(),
                0
            );

        const startKey =
            Number(

                previousMonthStart
                .toISOString()
                .slice(0,10)
                .replaceAll("-","")

            );

        const endKey =
            Number(

                previousMonthEnd
                .toISOString()
                .slice(0,10)
                .replaceAll("-","")

            );

        const rows =
            window.MAP
            .DataStore
            .sales || [];

        return rows.filter(row => {

            const dateKey =
                window.MAP
                .SalesRepository
                .getDateKey(
                    row.order_date
                );

            return (

                dateKey >= startKey &&

                dateKey <= endKey

            );

        });

    },

    getSelectedDays(){

        const from =
            window.MAP
            .FilterState
            .getFromDate();

        const to =
            window.MAP
            .FilterState
            .getToDate();

        if(
            !from ||
            !to
        ){
            return 1;
        }

        const start =
            new Date(from);

        const end =
            new Date(to);

        const diff =
            Math.floor(

                (
                    end -
                    start
                )

                /

                (
                    1000 *
                    60 *
                    60 *
                    24
                )

            ) + 1;

        return Math.max(
            diff,
            1
        );

    }

};