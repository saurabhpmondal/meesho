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

            toolbar.style.display =
                "none";

            toolbar.innerHTML = "";

            return;

        }

        toolbar.style.display =
            "flex";

        toolbar.innerHTML = `

            <div class="toolbar-wrapper">

                ${
                    showSearch
                    ? window.MAP.Search.render()
                    : ""
                }

                ${
                    showFilters
                    ? window.MAP.Filters.render()
                    : ""
                }

            </div>

        `;

        if(showSearch){

            window.MAP.Search.init();

        }

        if(showFilters){

            window.MAP.Filters.init();

        }

    }

};
