const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const logger = require("./utils/logger");
const reqResLogger = require("./utils/reqResLogger");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const { initDb } = require("./config/db");
const routes = require("./routes/userRoutes");

const app = express();
const PORT = 3001;

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
      title: "User API",
      version: "1.0.0",
      description: "User microservice API",
    },
    servers: [{ url: "http://localhost:3001" }],
  },
  apis: ["./src/routes/*.js", "./src/index.js"],
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Mount Routes
app.use("/users", routes);

app.get("/", (req, res) => {
  res.send("User Service is running.");
});

app.listen(PORT, () => {
  logger.info("User Service running on http://localhost:3001");
  logger.info("Swagger docs at http://localhost:3001/api-docs");
});
