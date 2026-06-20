window.MAP = window.MAP || {};

window.MAP.GoogleSheetService = {

    CACHE_MINUTES: 5,

    SPREADSHEET_ID:
        "14N_OSTi1z1OiSF89I6RBPNXZnno9GPz1-snvuI9Lev0",

    async fetchSheet(gid, cacheKey){

        try{

            const cached =
                this.getCache(cacheKey);

            if(cached){

                console.log(
                    `${cacheKey} loaded from cache`
                );

                this.backgroundRefresh(
                    gid,
                    cacheKey
                );

                return cached;
            }

            return await this.fetchFresh(
                gid,
                cacheKey
            );

        }
        catch(error){

            console.error(error);

            return [];

        }

    },

    async fetchFresh(
        gid,
        cacheKey
    ){

        const url =
            `https://docs.google.com/spreadsheets/d/${this.SPREADSHEET_ID}/gviz/tq?tqx=out:json&gid=${gid}`;

        const response =
            await fetch(url);

        const text =
            await response.text();

        const json =
            JSON.parse(
                text.substring(
                    47,
                    text.length - 2
                )
            );

        const rows =
            json.table.rows || [];

        const cols =
            json.table.cols || [];

        const headers =
            cols.map(
                c => c.label
            );

        const data =
            rows.map(row => {

                const obj = {};

                headers.forEach(
                    (header,index)=>{

                        obj[header] =
                            row.c?.[index]?.v ?? "";

                    }
                );

                return obj;

            });

        this.setCache(
            cacheKey,
            data
        );

        return data;

    },

    backgroundRefresh(
        gid,
        cacheKey
    ){

        setTimeout(
            async ()=>{

                try{

                    await this.fetchFresh(
                        gid,
                        cacheKey
                    );

                    console.log(
                        `${cacheKey} refreshed`
                    );

                }
                catch(error){

                    console.error(
                        error
                    );

                }

            },
            100
        );

    },

    getCache(cacheKey){

        const cache =
            localStorage.getItem(
                cacheKey
            );

        if(!cache){
            return null;
        }

        const parsed =
            JSON.parse(cache);

        const age =
            Date.now() -
            parsed.timestamp;

        const maxAge =
            this.CACHE_MINUTES *
            60 *
            1000;

        if(age > maxAge){

            return null;

        }

        return parsed.data;

    },

    setCache(
        cacheKey,
        data
    ){

        try{

    localStorage.setItem(
        cacheKey,
        JSON.stringify({
            timestamp: Date.now(),
            data
        })
    );

}
catch(error){

    console.warn(
        "Cache skipped",
        cacheKey
    );

}

    },

    clearCache(){

        localStorage.removeItem(
            "sales_cache"
        );

        localStorage.removeItem(
            "ads_cache"
        );

        localStorage.removeItem(
            "master_cache"
        );

    }

};
