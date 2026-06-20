window.MAP = window.MAP || {};

window.MAP.ModuleManager.register({

    id: "dashboard",

    title: "Dashboard",

    featureFlag: "dashboard",

    permission: "dashboard_view",

    showSearch: true,

    showFilters: true,

    async render(container){

        container.innerHTML = `
            <div style="padding:20px;">

                <h2>
                    Dashboard
                </h2>

                <div id="dashboardStatus">
                    Loading data...
                </div>

            </div>
        `;

        await window.MAP
            .DataBootstrapService
            .load();

        const meta =
            window.MAP.DataStore
            .metadata;

        document.getElementById(
            "dashboardStatus"
        ).innerHTML = `

            <div>

                <p>
                    Sales Rows :
                    ${meta.salesRows}
                </p>

                <p>
                    Ads Rows :
                    ${meta.adsRows}
                </p>

                <p>
                    Master Rows :
                    ${meta.masterRows}
                </p>

                <p>
                    Status :
                    ${meta.refreshStatus}
                </p>

                <p>
                    Last Refresh :
                    ${
                        meta.lastRefresh
                        ?
                        new Date(
                            meta.lastRefresh
                        ).toLocaleString()
                        :
                        "-"
                    }
                </p>

            </div>

        `;

    }

});
