window.MAP = window.MAP || {};

window.MAP.ModuleManager.register({

    id: "pricing",

    title: "Pricing",

    featureFlag: "pricing",

    permission: "pricing_view",

    render(container){

        container.innerHTML = `
            <div style="padding:20px;">
                <h2>Pricing</h2>
                <p>Pricing Module Loaded</p>
            </div>
        `;

    }

});
