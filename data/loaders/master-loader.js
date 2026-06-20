window.MAP = window.MAP || {};

window.MAP.MasterLoader = {

    GID: "1659451695",

    async load(){

        try{

            window.MAP.DataStore
                .metadata
                .refreshStatus =
                "Loading Master Sheet";

            const data =
                await window.MAP
                .GoogleSheetService
                .fetchSheet(
                    this.GID,
                    "master_cache"
                );

            window.MAP.DataStore.master =
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
