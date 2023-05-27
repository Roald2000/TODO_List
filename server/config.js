import { createPool } from "mysql";
import dotenv from 'dotenv';

dotenv.config();

const TEST_PORT = process.env.TEST_PORT;

const DB_HOST = process.env.DB_HOST;
const DB_PORT = process.env.DB_PORT;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_NAME = process.env.DB_NAME;

const databaseOptions = {
    host: DB_HOST,
    port: DB_PORT,
    user: DB_USER,
    pass: DB_PASS,
    database: DB_NAME
}

const databasePool = createPool({
    ...databaseOptions,
    connectionLimit: 5
})


const executeQuery = (query, payload) => new Promise((resolve, reject) => {

    if (!Array.isArray(payload)) {
        payload = [payload];
    }

    databasePool.query(query, payload, (error, result) => {
        if (error) {
            reject(error);
        }
        resolve(result);
    })


});

const setResponseRequest = (res, responseCode, responseData) => {
    res.contentType("application/json");
    return !responseData ?
        res.status(responseCode) :
        res.status(responseCode).send({
            data: responseData
        });

}

export { databasePool, executeQuery, TEST_PORT, setResponseRequest }