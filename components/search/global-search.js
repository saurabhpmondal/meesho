window.MAP = window.MAP || {};

window.MAP.Search = {

    debounceTimer: null,

    render(){

        return `
            <div class="search-container">

                <input
                    type="text"
                    id="globalSearch"
                    class="global-search-input"
                    placeholder="Search ERP SKU, Product ID, Style ID, Seller SKU, Catalog ID"
                    value="${window.MAP.FilterState.getSearch()}"
                >

            </div>
        `;

    },

    init(){

        const input =
            document.getElementById(
                "globalSearch"
            );

        if(!input){
            return;
        }

        input.addEventListener(
            "input",
            (e)=>{

                clearTimeout(
                    this.debounceTimer
                );

                this.debounceTimer =
                    setTimeout(()=>{

                        const value =
                            e.target.value.trim();

                        window.MAP.FilterState
                            .setSearch(value);

                        console.log(
                            "Global Search:",
                            value
                        );

                    },300);

            }
        );

    }

};