window.MAP = window.MAP || {};

window.MAP.Router = {

    current: "dashboard",

    navigate(route){

        this.current = route;

        const content =
            document.getElementById("mainContent");

        if(!content) return;

        content.innerHTML = `
            <div style="padding:20px;">
                <h2>${route}</h2>
                <p>Module under development</p>
            </div>
        `;

        document
            .querySelectorAll(".nav-item")
            .forEach(x => x.classList.remove("active"));

        const active =
            document.querySelector(
                `[data-route="${route}"]`
            );

        if(active){
            active.classList.add("active");
        }

    }

};
