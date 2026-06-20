window.MAP = window.MAP || {};

window.MAP.ModuleManager.register({

    id: "dashboard",

    title: "Dashboard",

    featureFlag: "dashboard",

    permission: "dashboard_view",

    showSearch: true,

    showFilters: true,

    render(container){

        container.innerHTML = `
            <div style="padding:20px;">
                <h2>Dashboard</h2>
                <p>Dashboard Module Loaded</p>
            </div>
        `;

    }

});
