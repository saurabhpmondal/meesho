window.MAP = window.MAP || {};

window.MAP.AdsLoader = {

    GID: "8523756",

    async load(){

        try{

            window.MAP.DataStore
                .metadata
                .refreshStatus =
                "Loading Ads Sheet";

            const data =
                await window.MAP
                .GoogleSheetService
                .fetchSheet(
                    this.GID,
                    "ads_cache"
                );

            window.MAP.DataStore.ads =
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
