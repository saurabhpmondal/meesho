window.MAP = window.MAP || {};

window.MAP.DashboardStateRepository = {

    getTopStates(){

        const rows =
            window.MAP
            .SalesRepository
            .getRows();

        const map = {};

        rows.forEach(row => {

            const state =
                row.customer_state ||
                "Unknown";

            if(!map[state]){

                map[state] = {

                    state,

                    units: 0,

                    gmv: 0

                };

            }

            map[state].units +=
                Number(
                    row.quantity || 0
                );

            map[state].gmv +=
                Number(
                    row[
                        "supplier_listed_price_(incl._gst_+_commission)"
                    ] || 0
                );

        });

        const result =
            Object.values(map)
            .map(x => ({

                state:
                    x.state,

                units:
                    x.units,

                gmv:
                    x.gmv,

                asp:
                    x.units
                    ?
                    x.gmv / x.units
                    :
                    0

            }));

        result.sort(
            (a,b)=>
                b.units - a.units
        );

        return result.slice(0,10);

    }

};