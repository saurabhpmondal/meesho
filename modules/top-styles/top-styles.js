window.MAP = window.MAP || {};

window.MAP.ModuleManager.register({

    id: "top_styles",

    title: "Top Styles",

    featureFlag: "top_styles",

    permission: "top_styles_view",

    showSearch: true,

    showFilters: true,

    render(container){

        container.innerHTML = `
            <div style="padding:20px;">
                <h2>Top Styles</h2>
                <p>Top Styles Module Loaded</p>
            </div>
        `;

    }

});
