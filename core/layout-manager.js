window.MAP = window.MAP || {};

window.MAP.Layout = {

    renderToolbar(module){

        const toolbar =
            document.getElementById(
                "contextToolbar"
            );

        if(!toolbar){
            return;
        }

        const showSearch =
            module?.showSearch || false;

        const showFilters =
            module?.showFilters || false;

        if(
            !showSearch &&
            !showFilters
        ){

            toolbar.style.display = "none";

            toolbar.innerHTML = "";

            return;

        }

        toolbar.style.display = "flex";

        toolbar.innerHTML = `
            <div class="toolbar-placeholder">

                ${showSearch ? `
                    <div>
                        Search Area
                    </div>
                ` : ""}

                ${showFilters ? `
                    <div>
                        Filters Area
                    </div>
                ` : ""}

            </div>
        `;

    }

};
