const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const logger = require("./utils/logger");
const reqResLogger = require("./utils/reqResLogger");
const gatewayRoutes = require("./routes/gatewayRoutes");

const app = express();
const PORT = 3000;

app.use(cors());

// Custom Request/Response Logger
app.use(reqResLogger);

// Integrate Morgan with Winston logger
app.use(
  morgan("combined", {
    stream: { write: (message) => logger.info(message.trim()) },
  }),
);

// Swagger setup for the API Gateway
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "API Gateway - E-commerce System",
      version: "1.0.0",
      description: "Centralized Swagger for all Microservices via API Gateway",
    },
    servers: [{ url: `http://localhost:${PORT}` }],
    paths: {
      "/users": {
        get: {
          summary: "Returns the list of all users",
          responses: { 200: { description: "Success" } },
        },
        post: {
          summary: "Create a new user",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    name: { type: "string" },
                    email: { type: "string" },
                  },
                },
              },
            },
          },
          responses: { 201: { description: "Created" } },
        },
      },
      "/products": {
        get: {
          summary: "Returns all products",
          responses: { 200: { description: "Success" } },
        },
        post: {
          summary: "Create a new product",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    name: { type: "string" },
                    price: { type: "number" },
                  },
                },
              },
            },
          },
          responses: { 201: { description: "Created" } },
        },
      },
      "/orders": {
        get: {
          summary: "Returns all orders",
          responses: { 200: { description: "Success" } },
        },
        post: {
          summary: "Create a new order",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    userId: { type: "integer" },
                    productId: { type: "integer" },
                    status: { type: "string" },
                  },
                },
              },
            },
          },
          responses: { 201: { description: "Created" } },
        },
      },
      "/cart": {
        get: {
          summary: "Returns all carts",
          responses: { 200: { description: "Success" } },
        },
      },
      "/cart/payment": {
        post: {
          summary: "Process payment for a cart",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    userId: { type: "integer" },
                    amount: { type: "number" },
                  },
                },
              },
            },
          },
          responses: { 200: { description: "Success" } },
        },
      },
    },
  },
  apis: [],
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Mount Gateway Proxy Rules
app.use("/", gatewayRoutes);

app.get("/", (req, res) => {
  res.send(
    "API Gateway is running. Route to /users, /products, /orders, or /cart.",
  );
});

app.listen(PORT, () => {
  logger.info("API Gateway is running on http://localhost:3000");
});
