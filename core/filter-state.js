window.MAP = window.MAP || {};

window.MAP.FilterState = {

    searchText: "",

    fromDate: null,

    toDate: null,

    initialize(){

        const today =
            new Date();

        const firstDay =
            new Date(
                today.getFullYear(),
                today.getMonth(),
                1
            );

        this.fromDate =
            this.formatDateForInput(
                firstDay
            );

        this.toDate =
            this.formatDateForInput(
                today
            );

    },

    formatDateForInput(date){

        const year =
            date.getFullYear();

        const month =
            String(
                date.getMonth() + 1
            ).padStart(2,"0");

        const day =
            String(
                date.getDate()
            ).padStart(2,"0");

        return `${year}-${month}-${day}`;

    },

    setSearch(value){

        this.searchText =
            value || "";

    },

    setFromDate(value){

        this.fromDate =
            value;

    },

    setToDate(value){

        this.toDate =
            value;

    },

    getSearch(){

        return this.searchText;

    },

    getFromDate(){

        return this.fromDate;

    },

    getToDate(){

        return this.toDate;

    },

    clear(){

        this.searchText = "";

        this.initialize();

    }

};

window.MAP.FilterState.initialize();