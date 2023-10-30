require("dotenv").config();
const { Pool, Client } = require("pg");
const { readFile } = require("fs/promises");
const { logger } = require("../utils/logger");

const isProduction = process.env.NODE_ENV === "production";
const database =
    process.env.NODE_ENV === "test"
        ? process.env.POSTGRES_DB_TEST
        : process.env.POSTGRES_DB;

const connectionString = `postgresql://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT}/${database}`;

(async () => {
    if (!isProduction) {
        const client = await new Client({
            connectionString,
            ssl: { rejectUnauthorized: false },
        });

        logger.info("CLIENT CONNECTED");

        await client.connect();

        const initalSql = (await readFile("./config/init.sql")).toString();
        await client.query(
            `DROP SCHEMA public CASCADE;
            CREATE SCHEMA public;
            GRANT ALL ON SCHEMA public TO postgres;
            GRANT ALL ON SCHEMA public TO public;`
        );
        await client.query(initalSql);

        client.end();
        logger.info("DB POPULATED");
    }
})();

const pool = new Pool({
    connectionString,
    /*
    SSL is not supported in development
    */
    ssl: { rejectUnauthorized: false },
});

module.exports = {
    query: (text, params) => pool.query(text, params),
    end: () => pool.end(),
};
