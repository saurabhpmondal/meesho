window.MAP = window.MAP || {};

window.MAP.state = {
    appReady: false,

    user: null,

    role: null,

    permissions: [],

    featureFlags: {},

    logs: []
};

window.MAP.addLog = function(message){

    const timestamp =
        new Date().toLocaleTimeString();

    window.MAP.state.logs.push({
        timestamp,
        message
    });

    console.log(message);
};
