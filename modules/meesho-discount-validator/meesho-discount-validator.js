window.MAP = window.MAP || {};

window.MAP.ModuleManager.register({

    id: "meesho-discount-validator",

    title: "Meesho Discount Validator",

    featureFlag: "pricing",

    permission: "pricing_view",

    showSearch: false,

    showFilters: false,

    render(container){

        window.MAP
        .MeeshoDiscountValidatorUI
        .render(
            container
        );

        window.MAP
        .MeeshoDiscountValidatorEvents
        .bind();

    }

});