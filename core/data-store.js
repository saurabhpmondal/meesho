window.MAP = window.MAP || {};

window.MAP.DataStore = {

    sales: [],

    ads: [],

    master: [],

    metadata: {

        salesRows: 0,

        adsRows: 0,

        masterRows: 0,

        lastRefresh: null,

        refreshStatus: "Not Loaded"

    },

    updateMetadata(){

        this.metadata.salesRows =
            this.sales.length;

        this.metadata.adsRows =
            this.ads.length;

        this.metadata.masterRows =
            this.master.length;

        this.metadata.lastRefresh =
            new Date().toISOString();

    }

};
