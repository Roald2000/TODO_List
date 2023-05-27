# File: server.js

This is the main server file for your application. It includes the implementation of various routes for managing a todo list using an Express.js framework and a MySQL database. The server listens on a specified port and handles HTTP requests for adding, updating, retrieving, and deleting todo items.

## Prerequisites

Before running the server, make sure you have the following prerequisites installed:

- Node.js
- npm (Node Package Manager)
- MySQL

## Installation

1. Clone the repository or download the files for the project.
2. Navigate to the project directory using the command line.
3. Run the following command to install the required dependencies:

   ```
   npm install
   ```

## Configuration

Ensure you have the necessary configuration settings in place before running the server. The configuration file `config.js` is responsible for setting up the MySQL database connection and other environment-specific variables.

Open the `config.js` file and update the following environment variables:

- `TEST_PORT`: The port on which the server will listen.
- `DB_HOST`: The hostname or IP address of the MySQL database server.
- `DB_PORT`: The port number of the MySQL database server.
- `DB_USER`: The username for accessing the MySQL database.
- `DB_PASS`: The password for the specified database user.
- `DB_NAME`: The name of the MySQL database.

## Usage

To start the server, run the following command:

```
node server.js
```

Once the server is running, you can access the endpoints using the specified routes and perform various actions on the todo list.

## Endpoints

### `POST /todo_add`

Adds a new todo item to the database.

**Request Body:**

```
{
  "todo": "Task description",
  "start_date": "YYYY-MM-DD",
  "due_date": "YYYY-MM-DD"
}
```

### `PUT /todo_update/:id`

Updates an existing todo item in the database with the specified ID.

**URL Parameters:**

- `id`: The ID of the todo item to be updated.

**Request Body:**

```
{
  "todo": "Updated task description",
  "start_date": "YYYY-MM-DD",
  "due_date": "YYYY-MM-DD"
}
```

### `GET /todo_list`

Retrieves a list of todo items from the database.

### `GET /todo_get/:id`

Retrieves a specific todo item from the database based on the specified ID.

**URL Parameters:**

- `id`: The ID of the todo item to be retrieved.

### `DELETE /todo_delete/:id`

Deletes a specific todo item from the database based on the specified ID.

**URL Parameters:**

- `id`: The ID of the todo item to be deleted.

### `DELETE /todo_clear`

Deletes all todo items from the database.

## Error Handling

The server handles errors and returns appropriate error responses. If an error occurs during the execution of a route handler, an error object is passed to the error handling middleware, which then sends an error response to the client.

## License

This project is licensed under the [MIT License](LICENSE).

---

# File: config.js

The configuration file `config.js` contains the necessary configuration settings for establishing a connection to the MySQL database and handling queries.

## Installation

To install the required dependencies, run the following command in the project directory:

```
npm install
```

## Configuration

Before running the server, make sure to configure the database connection and other environment-specific variables in the `config.js` file.

Update the following environment variables:

- `TEST_PORT`: The port on which the server will listen.
- `DB_HOST`: The hostname or IP address of the MySQL database server.
- `DB

_PORT`: The port number of the MySQL database server.

- `DB_USER`: The username for accessing the MySQL database.
- `DB_PASS`: The password for the specified database user.
- `DB_NAME`: The name of the MySQL database.

## Usage

The `config.js` file exports the following functions and variables:

- `databasePool`: A connection pool object for executing queries on the MySQL database.
- `executeQuery(query, payload)`: Executes a SQL query with the provided query string and payload.
- `TEST_PORT`: The port on which the server will listen.
- `setResponseRequest(res, responseCode, responseData)`: Sets the appropriate response headers and sends the response to the client.

## License

This project is licensed under the [MIT License](LICENSE).
