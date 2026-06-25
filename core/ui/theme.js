window.MAP = window.MAP || {};

window.MAP.Theme = {

    version : "1.0.0",

    mode : "light",

    colors : {

        primary     : "#4f46e5",
        secondary   : "#7c3aed",

        success     : "#16a34a",
        danger      : "#dc2626",
        warning     : "#f59e0b",
        info         : "#0ea5e9",

        background  : "#f5f7fb",
        surface     : "#ffffff",

        border      : "#e5e7eb",

        text        : "#111827",
        muted       : "#64748b",

        shadow      : "rgba(15,23,42,.08)"

    },

    radius : {

        sm : "8px",

        md : "14px",

        lg : "20px",

        xl : "26px"

    },

    spacing : {

        xs : "4px",

        sm : "8px",

        md : "16px",

        lg : "24px",

        xl : "32px",

        xxl : "48px"

    },

    shadow : {

        sm :

            "0 2px 8px rgba(15,23,42,.05)",

        md :

            "0 8px 20px rgba(15,23,42,.08)",

        lg :

            "0 18px 45px rgba(15,23,42,.12)"

    },

    transition : {

        fast :

            "all .15s ease",

        normal :

            "all .25s ease",

        slow :

            "all .4s ease"

    },

    font : {

        family :

            "Inter, Arial, sans-serif",

        title :

            "700",

        subtitle :

            "500",

        normal :

            "400"

    },

    getColor(name){

        return this.colors[name];

    },

    getRadius(name){

        return this.radius[name];

    },

    getShadow(name){

        return this.shadow[name];

    },

    getSpacing(name){

        return this.spacing[name];

    },

    getTransition(name){

        return this.transition[name];

    },

    isDark(){

        return this.mode === "dark";

    },

    setMode(mode){

        this.mode = mode;

    }

};