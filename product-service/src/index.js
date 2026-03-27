const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const logger = require("./utils/logger");
const reqResLogger = require("./utils/reqResLogger");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const { initDb } = require("./config/db");
const routes = require("./routes/productRoutes");

const app = express();
const PORT = 3002;

app.use(cors());

// Integrate Morgan with Winston logger
app.use(morgan("combined", { stream: { write: message => logger.info(message.trim()) } }));
app.use(express.json());

// Custom Request/Response Logger
app.use(reqResLogger);

// Init Database
initDb();

// Swagger setup
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Product API",
      version: "1.0.0",
      description: "Product microservice API",
    },
    servers: [{ url: "http://localhost:3002" }],
  },
  apis: ["./src/routes/*.js", "./src/index.js"],
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Mount Routes
app.use("/products", routes);

app.get("/", (req, res) => {
  res.send("Product Service is running.");
});

app.listen(PORT, () => {
  logger.info("Product Service running on http://localhost:3002");
  logger.info("Swagger docs at http://localhost:3002/api-docs");
});
