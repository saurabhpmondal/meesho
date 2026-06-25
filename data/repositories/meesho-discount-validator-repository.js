window.MAP = window.MAP || {};

window.MAP.MeeshoDiscountValidatorRepository = {

    requiredHeaders:[

        "Product ID",

        "Meesho Price Before Discount",

        "Min Discount"

    ],

    validateFile(rows){

        if(

            !rows ||

            rows.length === 0

        ){

            return{

                success:false,

                message:
                    "File is empty."

            };

        }

        const headers =

            Object.keys(
                rows[0]
            );

        for(

            const header

            of

            this.requiredHeaders

        ){

            if(

                !headers.includes(
                    header
                )

            ){

                return{

                    success:false,

                    message:

                    "Missing column : " +

                    header

                };

            }

        }

        let found = 0;

        let notFound = 0;

        rows.forEach(row=>{

            const productId =

                String(

                    row[
                        "Product ID"
                    ] || ""

                ).trim();

            const master =

                this.findProduct(

                    productId

                );

            if(master){

                found++;

            }

            else{

                notFound++;

            }

        });

        return{

            success:true,

            found,

            notFound

        };

    },

    generate(rows){

        const output = [];

        rows.forEach(row=>{

            const result =

                this.processRow(

                    row

                );

            output.push(

                result

            );

        });

        return output;

    },

    findProduct(productId){

        const rows =
            window.MAP.DataStore.master || [];

        const searchValue =
            String(productId || "")
            .trim()
            .toLowerCase();

        return rows.find(row =>

            String(
                row.product_id || ""
            )
            .trim()
            .toLowerCase()

            ===

            searchValue

        ) || null;

    },

    processRow(row){

        const productId =

            String(

                row[
                    "Product ID"
                ] || ""

            ).trim();

        const currentSP =

            Number(

                row[
                    "Meesho Price Before Discount"
                ] || 0

            );

        const requestedDiscount =

            Number(

                row[
                    "Min Discount"
                ] || 0

            );

        const master =

            this.findProduct(
                productId
            );

        if(!master){

            return{

                "Product ID":
                    productId,

                "Meesho Price Before Discount":
                    currentSP,

                "Min Discount":
                    requestedDiscount,

                "Agreed Meesho Discount %":
                    "NA",

                "Eligibility":
                    "Product Not Found"

            };

        }

        const result =

            window.MAP
            .FlexiGrowthRepository
            .evaluate(

                master.style_id,

                currentSP

            );

        if(

            !result

        ){

            return{

                "Product ID":
                    productId,

                "Meesho Price Before Discount":
                    currentSP,

                "Min Discount":
                    requestedDiscount,

                "Agreed Meesho Discount %":
                    "NA",

                "Eligibility":
                    "Pricing Error"

            };

        }

        const maxDiscount =

            Number(
                result.max_discount || 0
            );

        if(

            maxDiscount >=

            requestedDiscount

        ){

            return{

                "Product ID":
                    productId,

                "Meesho Price Before Discount":
                    currentSP,

                "Min Discount":
                    requestedDiscount,

                "Agreed Meesho Discount %":
                    maxDiscount,

                "Eligibility":
                    "Eligible"

            };

        }

        return{

            "Product ID":
                productId,

            "Meesho Price Before Discount":
                currentSP,

            "Min Discount":
                requestedDiscount,

            "Agreed Meesho Discount %":
                "NA",

            "Eligibility":
                "Not Eligible"

        };

    }

    getFoundCount(rows){

        return rows.filter(row =>

            this.findProduct(

                row[
                    "Product ID"
                ]

            )

        ).length;

    },

    getNotFoundCount(rows){

        return rows.length -

            this.getFoundCount(
                rows
            );

    }

};