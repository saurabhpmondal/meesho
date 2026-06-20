window.MAP = window.MAP || {};

window.MAP.Navigation = {

    getModules(){

        const flags =
            window.MAP.state.featureFlags || [];

        const enabledModules =
            flags
            .filter(x => x.enabled)
            .map(x => x.module_name);

        const modules = [];

        if(enabledModules.includes("dashboard")){
            modules.push({
                id:"dashboard",
                title:"Dashboard"
            });
        }

        if(enabledModules.includes("top_styles")){
            modules.push({
                id:"top_styles",
                title:"Top Styles"
            });
        }

        if(enabledModules.includes("pricing")){
            modules.push({
                id:"pricing",
                title:"Pricing"
            });
        }

        if(enabledModules.includes("flexi_growth")){
            modules.push({
                id:"flexi_growth",
                title:"Flexi Growth"
            });
        }

        if(enabledModules.includes("sales_events")){
            modules.push({
                id:"sales_events",
                title:"Sales Events"
            });
        }

        if(enabledModules.includes("flash_sale")){
            modules.push({
                id:"flash_sale",
                title:"Flash Sale"
            });
        }

        return modules;

    },

    render(){

        const modules =
            this.getModules();

        const navHtml =
            modules
            .map(m => `
                <div
                    class="nav-item"
                    data-route="${m.id}"
                >
                    ${m.title}
                </div>
            `)
            .join("");

        return navHtml;

    }

};
