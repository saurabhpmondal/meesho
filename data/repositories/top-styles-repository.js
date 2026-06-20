window.MAP = window.MAP || {};

window.MAP.TopStylesRepository = {

    getRankedStyles(

        rankBy = "units",

        limit = 50

    ){

        const salesRows =
            window.MAP
            .SalesRepository
            .getRows();

        const map = {};

        salesRows.forEach(row => {

            const master =
                window.MAP
                .MasterRepository
                .findBySellerSku(
                    row.sku
                );

            if(!master){
                return;
            }

            const erpSku =
                master.erpsku ||
                "Unknown";

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

        const days =
            this.getSelectedDays();

        let result =
            Object.values(map)
            .map(item => ({

                ...item,

                asp:
                    item.units
                    ?
                    item.gmv /
                    item.units
                    :
                    0,

                drr:
                    days
                    ?
                    item.units /
                    days
                    :
                    0

            }));

        result.sort((a,b)=>{

            if(rankBy === "gmv"){

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

        result =
            result.map(
                (row,index)=>({

                    rank:
                        index + 1,

                    ...row

                })
            );

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
                ) /

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