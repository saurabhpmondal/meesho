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

        <div
            style="
                display:flex;
                justify-content:center;
                padding:30px;
            "
        >

            <div
                style="
                    width:100%;
                    max-width:700px;
                "
            >

                <div
                    class="dashboard-report-card"
                    style="
                        padding:30px;
                        border-radius:24px;
                    "
                >

                    <div
                        style="
                            text-align:center;
                            margin-bottom:30px;
                        "
                    >

                        <h1
                            style="
                                margin:0;
                                font-size:32px;
                            "
                        >
                            Flexi Growth
                        </h1>

                        <div
                            style="
                                color:#666;
                                margin-top:8px;
                            "
                        >
                            Check Additional Discount Opportunity
                        </div>

                    </div>

                    <div
                        style="
                            display:flex;
                            flex-direction:column;
                            gap:16px;
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
                                    padding:14px;
                                    margin-top:6px;
                                    border-radius:12px;
                                "
                            >

                        </div>

                        <div>

                            <label>
                                Current Selling Price
                            </label>

                            <input
                                id="flexiCurrentSP"
                                type="number"
                                placeholder="Enter Current SP"
                                style="
                                    width:100%;
                                    padding:14px;
                                    margin-top:6px;
                                    border-radius:12px;
                                "
                            >

                        </div>

                        <button
                            id="flexiCheckBtn"
                            style="
                                padding:16px;
                                border:none;
                                border-radius:12px;
                                cursor:pointer;
                                font-size:16px;
                                font-weight:600;
                            "
                        >
                            Check Eligibility
                        </button>

                    </div>

                    <div
                        id="flexiResult"
                        style="
                            margin-top:30px;
                        "
                    ></div>

                </div>

            </div>

        </div>

        `;

        document
        .getElementById(
            "flexiCheckBtn"
        )
        .addEventListener(

            "click",

            () => {

                const searchValue =

                    document
                    .getElementById(
                        "flexiSearch"
                    )
                    .value
                    .trim();

                const currentSP =

                    Number(

                        document
                        .getElementById(
                            "flexiCurrentSP"
                        )
                        .value

                    );

                if(!searchValue){

                    alert(
                        "Enter Style ID or Product ID"
                    );

                    return;

                }

                if(!currentSP){

                    alert(
                        "Enter Current SP"
                    );

                    return;

                }

                const result =

                    window.MAP
                    .FlexiGrowthRepository
                    .evaluate(

                        searchValue,

                        currentSP

                    );

                if(!result){

                    document
                    .getElementById(
                        "flexiResult"
                    )
                    .innerHTML = `

                        <div
                            style="
                                text-align:center;
                                padding:30px;
                                border-radius:20px;
                                background:#fff3f3;
                                color:#d32f2f;
                                font-weight:700;
                            "
                        >
                            Style Not Found
                        </div>

                    `;

                    return;

                }

                document
                .getElementById(
                    "flexiResult"
                )
                .innerHTML = `

                <div
                    style="
                        border-radius:24px;
                        padding:30px;
                        box-shadow:
                            0 10px 30px
                            rgba(
                                0,
                                0,
                                0,
                                0.08
                            );
                        text-align:center;
                    "
                >

                    <div
                        style="
                            font-size:18px;
                            font-weight:700;
                            margin-bottom:15px;
                        "
                    >

                        ${
                            result.eligible

                            ?

                            "🟢 ELIGIBLE"

                            :

                            "🔴 NOT ELIGIBLE"
                        }

                    </div>

                    ${
                        result.eligible

                        ?

                        `

                        <div
                            style="
                                color:#666;
                                margin-bottom:10px;
                            "
                        >
                            Additional Discount Possible
                        </div>

                        <div
                            style="
                                font-size:14px;
                                color:#888;
                            "
                        >
                            UP TO
                        </div>

                        <div
                            style="
                                font-size:72px;
                                font-weight:800;
                                line-height:1;
                                margin:10px 0 20px;
                            "
                        >
                            ${result.max_discount}%
                        </div>

                        `

                        :

                        `

                        <div
                            style="
                                font-size:18px;
                                margin-top:15px;
                            "
                        >
                            No Additional Discount Possible
                        </div>

                        `
                    }

                    <hr
                        style="
                            margin:25px 0;
                        "
                    >

                    <div
                        style="
                            text-align:left;
                            display:grid;
                            grid-template-columns:
                                1fr 1fr;
                            gap:12px;
                        "
                    >

                        <div>
                            <b>Style ID</b>
                        </div>

                        <div>
                            ${result.style_id}
                        </div>

                        <div>
                            <b>Product ID</b>
                        </div>

                        <div>
                            ${result.product_id}
                        </div>

                        <div>
                            <b>ERP SKU</b>
                        </div>

                        <div>
                            ${result.erpsku}
                        </div>

                        <div>
                            <b>ERP Status</b>
                        </div>

                        <div>
                            ${result.erp_status}
                        </div>

                        <div>
                            <b>Current SP</b>
                        </div>

                        <div>
                            ₹${result.current_sp}
                        </div>

                        <div>
                            <b>Min Discount</b>
                        </div>

                        <div>

                            ${
                                result.min_discount === null

                                ?

                                "Not Possible"

                                :

                                result.min_discount + "%"
                            }

                        </div>

                        <div>
                            <b>Max Discount</b>
                        </div>

                        <div>
                            ${result.max_discount}%
                        </div>

                    </div>

                </div>

                `;

            }

        );

    }

});