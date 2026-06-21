window.MAP = window.MAP || {};

window.MAP.ModuleManager.register({

    id: "top-styles",

    title: "Top Styles",

    featureFlag: "top_styles",

    permission: "top_styles_view",

    showSearch: true,

    showFilters: true,

    async render(container){

        const state =
            window.MAP.state;

        if(
            !state.topStylesRankBy
        ){

            state.topStylesRankBy =
                "units";

        }

        if(
            !state.topStylesLimit
        ){

            state.topStylesLimit =
                "50";

        }

        const rows =
            window.MAP
            .TopStylesRepository
            .getRankedStyles(

                state.topStylesRankBy,

                state.topStylesLimit

            );

        const fromDate =
            window.MAP.FilterState
            .getFromDate();

        const toDate =
            window.MAP.FilterState
            .getToDate();

        container.innerHTML = `

            <div class="dashboard-page">

                <div class="dashboard-header">

                    <div>

                        <h2>
                            Top Styles
                        </h2>

                        <div
                            class="dashboard-subtitle"
                        >

                            ${fromDate}
                            →
                            ${toDate}

                        </div>

                    </div>

                </div>

                <div
                    class="dashboard-report-card"
                >

                    <div
                        style="
                            display:flex;
                            gap:16px;
                            margin-bottom:20px;
                            flex-wrap:wrap;
                        "
                    >

                        <div>

                            <label>
                                Rank By
                            </label>

                            <br>

                            <select
                                id="rankBySelect"
                                style="
                                    padding:10px;
                                    min-width:160px;
                                "
                            >

                                <option
                                    value="units"
                                    ${
                                        state.topStylesRankBy ===
                                        "units"
                                        ?
                                        "selected"
                                        :
                                        ""
                                    }
                                >
                                    Units
                                </option>

                                <option
                                    value="gmv"
                                    ${
                                        state.topStylesRankBy ===
                                        "gmv"
                                        ?
                                        "selected"
                                        :
                                        ""
                                    }
                                >
                                    GMV
                                </option>

                            </select>

                        </div>

                        <div>

                            <label>
                                Show
                            </label>

                            <br>

                            <select
                                id="topLimitSelect"
                                style="
                                    padding:10px;
                                    min-width:160px;
                                "
                            >

                                <option value="10">
                                    Top 10
                                </option>

                                <option value="20">
                                    Top 20
                                </option>

                                <option value="50">
                                    Top 50
                                </option>

                                <option value="100">
                                    Top 100
                                </option>

                                <option value="all">
                                    All
                                </option>

                            </select>

                        </div>

                    </div>

                    <table
                        class="report-table"
                    >

                        <thead>

                            <tr>

                                <th>
                                    Last Month Rank
                                </th>

                                <th>
                                    Current Rank
                                </th>

                                <th>
                                    ERP SKU
                                </th>

                                <th>
                                    ERP Launch Date
                                </th>

                                <th>
                                    ERP Status
                                </th>

                                <th>
                                    Sold Units
                                </th>

                                <th>
                                    GMV
                                </th>

                                <th>
                                    ASP
                                </th>

                                <th>
                                    DRR
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            ${rows.map(row => `

                                <tr>

                                    <td>

                                        ${
                                            row.lastMonthRank
                                            ||
                                            "-"
                                        }

                                    </td>

                                    <td>

                                        ${renderRankTrend(
                                            row
                                        )}

                                    </td>

                                    <td>
                                        ${row.erpSku}
                                    </td>

                                    <td>
                                        ${
                                            row.erpLaunchDate || "-"
                                        }
                                    </td>

                                    <td>
                                        ${
                                            row.erpStatus || "-"
                                        }
                                    </td>

                                    <td>
                                        ${row.units
                                            .toLocaleString()}
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

                                    <td>
                                        ${row.drr
                                            .toFixed(2)}
                                    </td>

                                </tr>

                            `).join("")}

                        </tbody>

                    </table>

                </div>

            </div>

        `;

        function renderRankTrend(
            row
        ){

            if(
                row.isNewEntry
            ){

                return `

                <span
                    style="
                        color:#7c3aed;
                        font-weight:600;
                    "
                >

                    New #${row.rank}

                </span>

                `;

            }

            if(
                row.rankChange > 0
            ){

                return `

                <span
                    class="
                        positive-value
                    "
                >

                    #${row.rank}
                    ↑${row.rankChange}

                </span>

                `;

            }

            if(
                row.rankChange < 0
            ){

                return `

                <span
                    class="
                        negative-value
                    "
                >

                    #${row.rank}
                    ↓${Math.abs(
                        row.rankChange
                    )}

                </span>

                `;

            }

            return `

            #${row.rank}

            `;

        }

        const rankBySelect =
            document.getElementById(
                "rankBySelect"
            );

        const topLimitSelect =
            document.getElementById(
                "topLimitSelect"
            );

        topLimitSelect.value =
            state.topStylesLimit;

        rankBySelect.addEventListener(
            "change",
            () => {

                state.topStylesRankBy =
                    rankBySelect.value;

                window.MAP.Router
                    .navigate(
                        "top-styles"
                    );

            }
        );

        topLimitSelect.addEventListener(
            "change",
            () => {

                state.topStylesLimit =
                    topLimitSelect.value;

                window.MAP.Router
                    .navigate(
                        "top-styles"
                    );

            }
        );

    }

});