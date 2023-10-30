const swaggerAutogen = require("swagger-autogen")({ openapi: "3.0.0" });

const doc = require("./docs");

const outputFile = "./swagger.json";
const endpointsFiles = ["./index.js", "./routes/index.js"];

/* NOTE: if you use the express Router, you must pass in the 
   'endpointsFiles' only the root file where the route starts,
   such as index.js, app.js, routes.js, ... */
console.log(doc);
swaggerAutogen(outputFile, endpointsFiles, doc);
