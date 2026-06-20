window.MAP = window.MAP || {};

window.MAP.DailySalesReport = {

    render(){

        const rows =
            window.MAP
            .DashboardSalesRepository
            .getDailyPerformance();

        let html = `

            <div class="dashboard-report-card">

                <h3>
                    Daily Sales Performance
                </h3>

                <table class="report-table">

                    <thead>

                        <tr>

                            <th>Date</th>

                            <th>Units</th>

                            <th>GMV</th>

                            <th>ASP</th>

                        </tr>

                    </thead>

                    <tbody>

        `;

        rows.forEach((row,index)=>{

            let unitsClass = "";
            let gmvClass = "";

            if(index > 0){

                const prev =
                    rows[index - 1];

                if(
                    row.units >
                    prev.units
                ){
                    unitsClass =
                        "positive-value";
                }
                else if(
                    row.units <
                    prev.units
                ){
                    unitsClass =
                        "negative-value";
                }

                if(
                    row.gmv >
                    prev.gmv
                ){
                    gmvClass =
                        "positive-value";
                }
                else if(
                    row.gmv <
                    prev.gmv
                ){
                    gmvClass =
                        "negative-value";
                }

            }

            html += `

                <tr>

                    <td>
                        ${
                            window.MAP
                            .DashboardSalesRepository
                            .formatDate(
                                row.date
                            )
                        }
                    </td>

                    <td class="${unitsClass}">
                        ${row.units}
                    </td>

                    <td class="${gmvClass}">
                        ₹${Math.round(
                            row.gmv
                        ).toLocaleString()}
                    </td>

                    <td>
                        ₹${Math.round(
                            row.asp
                        ).toLocaleString()}
                    </td>

                </tr>

            `;

        });

        html += `

                    </tbody>

                </table>

            </div>

        `;

        return html;

    }

};