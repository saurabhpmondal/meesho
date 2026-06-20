window.MAP = window.MAP || {};

window.MAP.SalesLoader = {

    GID: "328436164",

    async load(){

        try{

            window.MAP.DataStore
                .metadata
                .refreshStatus =
                "Loading Sales Sheet";

            const data =
                await window.MAP
                .GoogleSheetService
                .fetchSheet(
                    this.GID,
                    "sales_cache"
                );

            window.MAP.DataStore.sales =
                data;

            window.MAP.DataStore
                .updateMetadata();

            return data;

        }
        catch(error){

            console.error(error);

            return [];

        }

    }

};
