# TODO List App

This is a TODO List application that allows users to manage their tasks. The app consists of both client-side and server-side components.

## Client-Side

The client-side of the application is built using React.js and consists of the following files:

- `App.jsx`: The main component that renders the TODO List app. It handles adding, editing, and deleting tasks using various custom components such as `Form`, `LabelInput`, `FormSubmitButton`, and `DialogModal`.
- `Form.jsx`: A reusable form component that accepts a form ID, title, and children components. It handles form submission and triggers the `onSubmit` callback function with the form data.
- `LabelInput.jsx`: A custom input component that displays a label and an input field. It accepts various props like `inputRef`, `labelClass`, `htmlFor`, `inputText`, `inputID`, `inputClass`, `type`, and `required`.
- `FormSubmitButton.jsx`: A custom button component used for form submission. It accepts props like `label`, `type`, and `className`.
- `DialogModal.jsx`: A modal component used for editing tasks. It accepts props like `modalID` and `modalElements`, which can include other components such as `LabelInput` and `FormSubmitButton`.

## Server-Side

The server-side of the application is built using Node.js and Express.js, with MySQL as the database. The server-side files include:

- `server.js`: The main server file that sets up the Express.js server and defines the API endpoints for handling TODO list operations. It includes routes for adding, updating, listing, getting, and deleting tasks from the database.
- `config.js`: A configuration file that contains the database connection details, database pool setup, and utility functions for executing queries and setting the response request.

## Prerequisites

Before running the TODO List app, make sure you have the following dependencies and environment variables set up:

- Node.js and npm installed
- MySQL database configured with the appropriate tables and schema
- Environment variables set for the database connection details (DB_HOST, DB_PORT, DB_USER, DB_PASS, DB_NAME)

## Getting Started

To run the TODO List app, follow these steps:

1. Clone the repository and navigate to the project directory.
2. Install the dependencies by running `npm install`.
3. Set up the environment variables in the `.env` file or your preferred method.
4. Start the server by running `npm start`.
5. Access the app in your browser at `http://localhost:3310`.

## API Endpoints

The server-side provides the following API endpoints for managing the TODO list:

- `POST /todo_add`: Adds a new task to the list. Requires the `todo`, `start_date`, and `due_date` fields in the request body.
- `PUT /todo_update/:id`: Updates an existing task. Requires the `id` parameter in the URL and the updated task details (`todo`, `start_date`, `due_date`) in the request body.
- `GET /todo_list`: Retrieves a list of all tasks.
- `GET /todo_get/:id`: Retrieves a specific task by its ID. Requires the `id` parameter in the URL.
- `DELETE /todo_delete/:id`: Deletes a specific task by its ID. Requires the `id` parameter in the URL.
- `DELETE /todo_clear`: Deletes all tasks from the list.

## Error Handling

The server-side handles errors by sending appropriate HTTP status codes and error messages in the response. Errors can occur due to database connection issues, query execution failures, or invalid requests.

## Contributing

Contributions to the TODO List app are welcome! If you find any issues

 or have suggestions for improvements, feel free to submit a pull request or open an issue on the project repository.

## License

The TODO List app is open-source and released under the [MIT License](LICENSE). Feel free to use, modify, and distribute the code as per the license terms.

---

Thank you for your interest in the TODO List app! If you have any questions or need further assistance, please don't hesitate to reach out.
