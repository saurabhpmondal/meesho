window.MAP = window.MAP || {};

window.MAP.MonthlyAdsReport = {

    render(){

        const rows =
            window.MAP
            .DashboardAdsRepository
            .getLast6Months();

        let html = `

            <div class="dashboard-report-card">

                <h3>
                    Monthly Ads Performance
                </h3>

                <table class="report-table">

                    <thead>

                        <tr>

                            <th>Month</th>

                            <th>Views</th>

                            <th>Clicks</th>

                            <th>CTR</th>

                            <th>Orders</th>

                            <th>CVR</th>

                            <th>Ad Spend</th>

                            <th>Revenue</th>

                            <th>ROI</th>

                        </tr>

                    </thead>

                    <tbody>

        `;

        rows.forEach(row => {

            html += `

                <tr>

                    <td>
                        ${row.monthYear}
                    </td>

                    <td>
                        ${row.views.toLocaleString()}
                    </td>

                    <td>
                        ${row.clicks.toLocaleString()}
                    </td>

                    <td>
                        ${row.ctr.toFixed(2)}%
                    </td>

                    <td>
                        ${row.orders.toLocaleString()}
                    </td>

                    <td>
                        ${row.cvr.toFixed(2)}%
                    </td>

                    <td>
                        ₹${Math.round(
                            row.adSpend
                        ).toLocaleString()}
                    </td>

                    <td>
                        ₹${Math.round(
                            row.revenue
                        ).toLocaleString()}
                    </td>

                    <td>
                        ${row.roi.toFixed(2)}x
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