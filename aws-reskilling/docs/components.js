module.exports = {
    components: {
        schemas: {
            // id model
            id: {
                type: "number", // data type
                description: "An id of a model", // desc
                example: 2, // example of an id
            },
            Product: {
                type: "object", // data type
                properties: {
                    product_id: {
                        type: "number", // data-type
                        description: "Product identification number", // desc
                        example: "23", // example of an id
                    },
                    name: {
                        type: "string", // data-type
                        description: "Product name", // desc
                    },
                    price: {
                        type: "integer", // data-type
                        description: "Product price", // desc
                    },
                    description: {
                        type: "string", // data-type
                        description: "Product description", // desc
                    },
                    image_url: {
                        type: "string", // data-type
                        description: "Product image url", // desc
                    },
                    avg_rating: {
                        type: "string", // data type
                        description: "Product total average rating", // desc
                    },
                    count: {
                        type: "integer", // data type
                        description: "Total number of reviews", // desc
                    },
                },
            },
        },
    },
};
