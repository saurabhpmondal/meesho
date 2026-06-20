window.MAP = window.MAP || {};

window.MAP.Filters = {

    render(){

        return `
            <div class="filter-container">

                <input
                    type="date"
                    id="dateFrom"
                    value="${window.MAP.FilterState.getFromDate()}"
                >

                <input
                    type="date"
                    id="dateTo"
                    value="${window.MAP.FilterState.getToDate()}"
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

        from.addEventListener(
            "change",
            ()=>{

                window.MAP.FilterState
                    .setFromDate(
                        from.value
                    );

                console.log(
                    "From Date:",
                    from.value
                );

            }
        );

        to.addEventListener(
            "change",
            ()=>{

                window.MAP.FilterState
                    .setToDate(
                        to.value
                    );

                console.log(
                    "To Date:",
                    to.value
                );

            }
        );

    }

};