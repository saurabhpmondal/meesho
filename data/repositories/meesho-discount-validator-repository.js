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
                    "Uploaded file is empty."

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

            const product =

                this.findProduct(
                    productId
                );

            if(product){

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

    findProduct(productId){

        const masterRows =

            window.MAP
            .DataStore
            .master || [];

        const search =

            String(
                productId
            )
            .trim()
            .toLowerCase();

        for(

            const row

            of

            masterRows

        ){

            const value =

                String(

                    row.product_id ||

                    row.productid ||

                    row["Product ID"] ||

                    ""

                )
                .trim()
                .toLowerCase();

            if(

                value === search

            ){

                return row;

            }

        }

        return null;

    },

    generate(rows){

        const output = [];

        rows.forEach(row=>{

            output.push(

                this.processRow(
                    row
                )

            );

        });

        return output;

    },


    processRow(row){

        const productId =

            String(

                row[
                    "Product ID"
                ] || ""

            ).trim();

        const currentPrice =

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

        const product =

            this.findProduct(
                productId
            );

        if(!product){

            return{

                "Product ID":
                    productId,

                "Meesho Price Before Discount":
                    currentPrice,

                "Min Discount":
                    requestedDiscount,

                "Agreed Meesho Discount %":
                    "NA",

                "Eligibility":
                    "Product Not Found"

            };

        }

        let result = null;

        try{

            result =

                window.MAP
                .FlexiGrowthRepository
                .evaluate(

                    product.style_id,

                    currentPrice

                );

        }

        catch(error){

            console.error(error);

        }

        if(

            !result

        ){

            return{

                "Product ID":
                    productId,

                "Meesho Price Before Discount":
                    currentPrice,

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
                    currentPrice,

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
                currentPrice,

            "Min Discount":
                requestedDiscount,

            "Agreed Meesho Discount %":
                "NA",

            "Eligibility":
                "Not Eligible"

        };

    }

};