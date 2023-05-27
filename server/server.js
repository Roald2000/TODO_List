import express from 'express';
import cors from 'cors';
import { TEST_PORT, databasePool, executeQuery, setResponseRequest } from './config.js';

const app = express();

app.use(express.json());
app.use(cors({ origin: 'http://localhost:3310', allowedHeaders: 'content-type' }));


const checkDatabaseConnection = (req, res, next) => {
    databasePool.getConnection((error, connection) => {
        if (error) {
            const errDBConnection = new Error();
            errDBConnection.message = error.message;
            errDBConnection.status = 500;
            next(errDBConnection);
        } else {
            connection.release()
            next();
        }
    });
}

app.post('/todo_add', checkDatabaseConnection, async (req, res, next) => {
    try {

        const { todo, start_date, due_date } = req.body;

        let result = executeQuery('insert into todo_tbl(todo,start_date,due_date) values(?,?,?)', [todo, start_date, due_date]);

        if (!result) {
            throw new Error("Insert Error");
        } else {
            setResponseRequest(res, 201, "Todo Added Succesfully!");
        }


    } catch (error) {
        next(error);
    }
});


app.put('/todo_update/:id', checkDatabaseConnection, async (req, res, next) => {
    try {
        const { id } = req.params;
        const { todo, start_date, due_date } = req.body;

        let result = await executeQuery("update todo_tbl set todo = ?, start_date = ?, due_date = ? where todo_id = ?", [todo, start_date, due_date, id])

        result && setResponseRequest(res, 201, "Todo Updated Succesfully!");
    } catch (error) {
        next(error);
    }
});

app.get('/todo_list', checkDatabaseConnection, async (req, res, next) => {
    try {
        let result = await executeQuery("select * from todo_tbl limit 10");

        if (result.length !== 0) {
            setResponseRequest(res, 200, result);
        } else {
            const errNotFound = new Error("No Items Found");
            errNotFound.status = 404;
            throw errNotFound
        }
    } catch (error) {
        next(error);
    }
});

app.get('/todo_get/:id', checkDatabaseConnection, async (req, res, next) => {
    try {
        const { id } = req.params;
        let result = await executeQuery("select * from todo_tbl where todo_id = ? limit 10", id);

        if (result.length !== 0) {
            setResponseRequest(res, 200, result);
        } else {
            const errNotFound = new Error(`List item with an id of '${id}' doesnt exist!`);
            errNotFound.status = 404;
            throw errNotFound
        }
    } catch (error) {
        next(error);
    }
});

app.delete('/todo_delete/:id', checkDatabaseConnection, async (req, res, next) => {
    try {
        await executeQuery("delete from todo_tbl where todo_id = ?", req.params.id) && setResponseRequest(res, 200,"Item Deleted");
    } catch (error) {
        next(error);
    }
});

app.delete('/todo_clear', checkDatabaseConnection, async (req, res, next) => {
    try {
        await executeQuery("delete from todo_tbl") && setResponseRequest(res, 200, "Cleared");
    } catch (error) {
        next(error);
    }
});

app.use((err, req, res, next) => {
    const errData = err.message || "Internal Server Error";
    const errCode = err.status || 500;
    setResponseRequest(res, errCode, errData);
})


app.listen(TEST_PORT, () => console.log(`TODO REQUESTS @ http://localhost:${TEST_PORT}`))



