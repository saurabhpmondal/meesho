window.MAP = window.MAP || {};

window.MAP.TopStatesReport = {

    render(){

        const rows =
            window.MAP
            .DashboardStateRepository
            .getTopStates();

        let html = `

            <div class="dashboard-report-card">

                <h3>
                    Top 10 States
                </h3>

                <table class="report-table">

                    <thead>

                        <tr>

                            <th>State</th>

                            <th>Units</th>

                            <th>GMV</th>

                            <th>ASP</th>

                        </tr>

                    </thead>

                    <tbody>

        `;

        rows.forEach(row => {

            html += `

                <tr>

                    <td>
                        ${row.state}
                    </td>

                    <td>
                        ${row.units.toLocaleString()}
                    </td>

                    <td>
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