window.MAP = window.MAP || {};

window.MAP.AdsRepository = {

    getCurrentMonthRow(){

        const fromDate =
            window.MAP.FilterState
            .getFromDate();

        if(!fromDate){
            return null;
        }

        const selectedDate =
            new Date(fromDate);

        const month =
            selectedDate.getMonth() + 1;

        const year =
            selectedDate.getFullYear();

        return (
            window.MAP.DataStore.ads || []
        ).find(row =>

            Number(row.month) === month &&

            Number(row.year) === year

        );

    },

    getAdSpend(){

        const row =
            this.getCurrentMonthRow();

        if(!row){
            return 0;
        }

        return Number(
            String(row.ads_spend)
                .replaceAll(",", "")
        );

    },

    getRevenue(){

        const row =
            this.getCurrentMonthRow();

        if(!row){
            return 0;
        }

        return Number(
            String(row.revenue)
                .replaceAll(",", "")
        );

    },

    getROI(){

        const row =
            this.getCurrentMonthRow();

        if(!row){
            return 0;
        }

        return Number(
            row.roi || 0
        );

    },

    getViews(){

        const row =
            this.getCurrentMonthRow();

        if(!row){
            return 0;
        }

        return Number(
            String(row.views)
                .replaceAll(",", "")
        );

    },

    getClicks(){

        const row =
            this.getCurrentMonthRow();

        if(!row){
            return 0;
        }

        return Number(
            String(row.clicks)
                .replaceAll(",", "")
        );

    },

    getOrders(){

        const row =
            this.getCurrentMonthRow();

        if(!row){
            return 0;
        }

        return Number(
            String(row.orders)
                .replaceAll(",", "")
        );

    }

};