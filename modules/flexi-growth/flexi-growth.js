window.MAP = window.MAP || {};

window.MAP.ModuleManager.register({

    id: "flexi-growth",

    title: "Flexi Growth",

    featureFlag: "flexi_growth",

    permission: "pricing_view",

    showSearch: false,

    showFilters: false,

    render(container){

        container.innerHTML = `

        <div class="dashboard-page">

            <div class="dashboard-report-card">

                <h2
                    style="
                        margin-bottom:20px;
                    "
                >
                    Flexi Growth
                </h2>

                <div
                    style="
                        display:grid;
                        grid-template-columns:
                            repeat(
                                auto-fit,
                                minmax(
                                    250px,
                                    1fr
                                )
                            );
                        gap:16px;
                        margin-bottom:20px;
                    "
                >

                    <div>

                        <label>
                            Style ID / Product ID
                        </label>

                        <input
                            id="flexiSearch"
                            type="text"
                            placeholder="Enter Style ID or Product ID"
                            style="
                                width:100%;
                                margin-top:6px;
                                padding:12px;
                            "
                        >

                    </div>

                    <div>

                        <label>
                            Current SP
                        </label>

                        <input
                            id="flexiCurrentSP"
                            type="number"
                            placeholder="Enter Current SP"
                            style="
                                width:100%;
                                margin-top:6px;
                                padding:12px;
                            "
                        >

                    </div>

                </div>

                <div
                    style="
                        display:flex;
                        gap:10px;
                        margin-bottom:20px;
                    "
                >

                    <button
                        id="flexiSearchBtn"
                        style="
                            padding:12px 20px;
                            cursor:pointer;
                        "
                    >
                        Search
                    </button>

                    <button
                        id="flexiCheckBtn"
                        style="
                            padding:12px 20px;
                            cursor:pointer;
                        "
                    >
                        Check Eligibility
                    </button>

                </div>

                <div
                    id="flexiStyleInfo"
                ></div>

                <div
                    id="flexiResult"
                    style="
                        margin-top:20px;
                    "
                ></div>

            </div>

        </div>

        `;

        let selectedStyle =
            null;

        document
            .getElementById(
                "flexiSearchBtn"
            )
            .addEventListener(

                "click",

                () => {

                    const value =

                        document
                        .getElementById(
                            "flexiSearch"
                        )
                        .value
                        .trim();

                    if(!value){

                        alert(
                            "Enter Style ID"
                        );

                        return;

                    }

                    const row =

                        window.MAP
                        .FlexiGrowthRepository
                        .findStyle(
                            value
                        );

                    selectedStyle =
                        row;

                    if(!row){

                        document
                        .getElementById(
                            "flexiStyleInfo"
                        )
                        .innerHTML = `

                            <div
                                class="
                                    negative-value
                                "
                            >
                                Style Not Found
                            </div>

                        `;

                        return;

                    }

                    document
                    .getElementById(
                        "flexiStyleInfo"
                    )
                    .innerHTML = `

                        <table
                            class="
                                report-table
                            "
                        >

                            <tr>

                                <td>
                                    Style ID
                                </td>

                                <td>
                                    ${row.style_id}
                                </td>

                            </tr>

                            <tr>

                                <td>
                                    Product ID
                                </td>

                                <td>
                                    ${row.product_id}
                                </td>

                            </tr>

                            <tr>

                                <td>
                                    ERP SKU
                                </td>

                                <td>
                                    ${row.erpsku}
                                </td>

                            </tr>

                            <tr>

                                <td>
                                    ERP Status
                                </td>

                                <td>
                                    ${row.erp_status}
                                </td>

                            </tr>

                        </table>

                    `;

                }

            );

        document
            .getElementById(
                "flexiCheckBtn"
            )
            .addEventListener(

                "click",

                () => {

                    if(
                        !selectedStyle
                    ){

                        alert(
                            "Search style first"
                        );

                        return;

                    }

                    const currentSP =

                        Number(

                            document
                            .getElementById(
                                "flexiCurrentSP"
                            )
                            .value

                        );

                    if(
                        !currentSP
                    ){

                        alert(
                            "Enter Current SP"
                        );

                        return;

                    }

                    const result =

                        window.MAP
                        .FlexiGrowthRepository
                        .evaluate(

                            selectedStyle
                            .style_id,

                            currentSP

                        );

                    if(
                        !result
                    ){
                        return;
                    }

                    document
                    .getElementById(
                        "flexiResult"
                    )
                    .innerHTML = `

                    <table
                        class="
                            report-table
                        "
                    >

                        <thead>

                            <tr>

                                <th>
                                    Style ID
                                </th>

                                <th>
                                    Product ID
                                </th>

                                <th>
                                    ERP SKU
                                </th>

                                <th>
                                    ERP Status
                                </th>

                                <th>
                                    Current SP
                                </th>

                                <th>
                                    Min Addl Disc %
                                </th>

                                <th>
                                    Max Addl Disc %
                                </th>

                                <th>
                                    Eligibility
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            <tr>

                                <td>
                                    ${result.style_id}
                                </td>

                                <td>
                                    ${result.product_id}
                                </td>

                                <td>
                                    ${result.erpsku}
                                </td>

                                <td>
                                    ${result.erp_status}
                                </td>

                                <td>
                                    ₹${result.current_sp}
                                </td>

                                <td>

                                    ${
                                        result.min_discount === null

                                        ?

                                        "N/A"

                                        :

                                        result.min_discount + "%"
                                    }

                                </td>

                                <td>

                                    ${
                                        result.max_discount
                                    }%

                                </td>

                                <td>

                                    <span

                                        class="
                                        ${
                                            result.eligible

                                            ?

                                            "positive-value"

                                            :

                                            "negative-value"
                                        }
                                        "

                                    >

                                        ${
                                            result.eligible

                                            ?

                                            "Eligible"

                                            :

                                            "Not Eligible"
                                        }

                                    </span>

                                </td>

                            </tr>

                        </tbody>

                    </table>

                    `;

                }

            );

    }

});