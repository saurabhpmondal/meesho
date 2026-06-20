window.MAP = window.MAP || {};

window.MAP.MasterRepository = {

    skuIndex: {},

    initialized: false,

    initialize(){

        if(this.initialized){
            return;
        }

        const master =
            window.MAP.DataStore.master || [];

        this.skuIndex = {};

        master.forEach(row => {

            const sku =
                String(
                    row.sellersku || ""
                ).trim();

            if(!sku){
                return;
            }

            this.skuIndex[sku] = row;

        });

        this.initialized = true;

        console.log(
            "Master Repository Ready",
            Object.keys(
                this.skuIndex
            ).length,
            "SKUs Indexed"
        );

    },

    getBySku(sku){

        if(!this.initialized){
            this.initialize();
        }

        return (
            this.skuIndex[
                String(sku).trim()
            ] || null
        );

    },

    getStyleId(sku){

        const row =
            this.getBySku(sku);

        return row
            ? row.style_id
            : "";

    },

    getBrand(sku){

        const row =
            this.getBySku(sku);

        return row
            ? row.brand
            : "";

    },

    getCategory(sku){

        const row =
            this.getBySku(sku);

        return row
            ? row.category
            : "";

    },

    getErpSku(sku){

        const row =
            this.getBySku(sku);

        return row
            ? row.erpsku
            : "";

    },

    getProductId(sku){

        const row =
            this.getBySku(sku);

        return row
            ? row.product_id
            : "";

    },

    getCatalogId(sku){

        const row =
            this.getBySku(sku);

        return row
            ? row.catalog_id
            : "";

    },

    getTP(sku){

        const row =
            this.getBySku(sku);

        return Number(
            row?.tp || 0
        );

    },

    getCurrentSP(sku){

        const row =
            this.getBySku(sku);

        return Number(
            row?.current_sp || 0
        );

    },

    getShipping(sku){

        const row =
            this.getBySku(sku);

        return Number(
            row?.shipping || 0
        );

    }

};


