# 🐠🐠🐠 Worquarium API - Swagger & Postman Setup

## Setup

1. Create your `.env` file from the provided example:

```bash
cp .env.example .env
```

On Windows, you can also manually copy `.env.example` and rename it to `.env`.

2. Fill in the required environment variables in `.env`.

3. Install dependencies:

```bash
npm install
```

4. Start the server:

```bash
node server.js
```

The API will run at:

```text
http://localhost:3000
```

## Swagger Documentation

Once the server is running, view the API documentation at:

```text
http://localhost:3000/api-docs
```

Swagger provides the available endpoints, request parameters, request bodies, and response formats.

## Postman Testing

Use **Postman** to test the API endpoints.

Import the provided Swagger/OpenAPI definition into Postman to create a collection of the available endpoints.

For local testing, use:

```text
http://localhost:3000
```

For routes containing `{id}`, replace it with the actual resource ID. For example:

```text
GET /api/avatars/{id}
```

becomes:

```text
GET http://localhost:3000/api/avatars/123
```

Keep `node server.js` running while testing requests in Postman.
