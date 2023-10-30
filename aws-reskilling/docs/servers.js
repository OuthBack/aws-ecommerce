module.exports = {
    servers: [
        {
            url: "http://ec2-100-25-219-111.compute-1.amazonaws.com/api", // url
            description: "Production server", // name
        },
        {
            url: "http://localhost:9000/api", // url
            description: "Local server", // name
        },
    ],
};
