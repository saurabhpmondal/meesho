window.MAP = window.MAP || {};

window.MAP.Router = {

    current: "dashboard",

    navigate(route){

        this.current = route;

        const content =
            document.getElementById(
                "mainContent"
            );

        if(!content){
            return;
        }

        const module =
            window.MAP.ModuleManager
            .get(route);

        if(module){

            window.MAP.Layout
                .renderToolbar(module);

            module.render(content);

        }
        else{

            content.innerHTML = `
                <div style="padding:20px;">
                    Module Not Found
                </div>
            `;

        }

        document
            .querySelectorAll(".nav-item")
            .forEach(x =>
                x.classList.remove(
                    "active"
                )
            );

        const active =
            document.querySelector(
                `[data-route="${route}"]`
            );

        if(active){

            active.classList.add(
                "active"
            );

        }

    }

};
