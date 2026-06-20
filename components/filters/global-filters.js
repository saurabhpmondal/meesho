window.MAP = window.MAP || {};

window.MAP.Filters = {

    render(){

        return `
            <div class="filter-container">

                <input
                    type="date"
                    id="dateFrom"
                >

                <input
                    type="date"
                    id="dateTo"
                >

            </div>
        `;

    },

    init(){

        const from =
            document.getElementById(
                "dateFrom"
            );

        const to =
            document.getElementById(
                "dateTo"
            );

        if(!from || !to){
            return;
        }

        const update = ()=>{

            window.MAP.state.filters = {

                dateFrom: from.value,

                dateTo: to.value

            };

            console.log(
                "Filters",
                window.MAP.state.filters
            );

        };

        from.addEventListener(
            "change",
            update
        );

        to.addEventListener(
            "change",
            update
        );

    }

};
