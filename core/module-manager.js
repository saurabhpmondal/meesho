window.MAP = window.MAP || {};

window.MAP.Modules = {};

window.MAP.ModuleManager = {

    register(module){

        if(!module || !module.id){
            return;
        }

        window.MAP.Modules[module.id] = module;

    },

    get(id){

        return window.MAP.Modules[id];

    },

    getAll(){

        return Object.values(
            window.MAP.Modules
        );

    }

};
