window.MAP = window.MAP || {};

window.MAP.DataBootstrapService = {

    async load(){

        try{

            const loaded =
                window.MAP.DataStore.loaded;

            if(
                loaded.sales &&
                loaded.ads &&
                loaded.master
            ){

                console.log(
                    "Data already loaded"
                );

                return;

            }

            window.MAP.DataStore
                .metadata
                .refreshStatus =
                "Loading Data";

            await Promise.all([

                this.loadSales(),

                this.loadAds(),

                this.loadMaster()

            ]);

            window.MAP.DataStore
                .metadata
                .refreshStatus =
                "Loaded";

            window.MAP.DataStore
                .updateMetadata();

            console.log(
                "Bootstrap Complete"
            );

        }
        catch(error){

            console.error(error);

            window.MAP.DataStore
                .metadata
                .refreshStatus =
                "Failed";

        }

    },

    async loadSales(){

        if(
            window.MAP.DataStore
            .loaded
            .sales
        ){
            return;
        }

        await window.MAP
            .SalesLoader
            .load();

        window.MAP.DataStore
            .loaded
            .sales = true;

    },

    async loadAds(){

        if(
            window.MAP.DataStore
            .loaded
            .ads
        ){
            return;
        }

        await window.MAP
            .AdsLoader
            .load();

        window.MAP.DataStore
            .loaded
            .ads = true;

    },

    async loadMaster(){

        if(
            window.MAP.DataStore
            .loaded
            .master
        ){
            return;
        }

        await window.MAP
            .MasterLoader
            .load();

        window.MAP.DataStore
            .loaded
            .master = true;

    },

    async forceRefresh(){

        window.MAP.DataStore
            .loaded = {

                sales:false,

                ads:false,

                master:false

            };

        await this.load();

    }

};
