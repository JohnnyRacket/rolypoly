import express from "express";
import bodyParser from "body-parser";
import compression from "compression";

import path from "path";
import cors from "cors";
import apiRoutes from "./controllers";

// Express configuration
let app = express();

// Redis connection

// set up cors middleware
app.use(cors());

// set up compression middleware
app.use(compression());

// set up parsing middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// api routes
app.use("/", apiRoutes);

// set port for server
const { PORT = 3000 } = process.env;
// start server
app.listen(PORT, () =>
    console.log(`Server is running http://localhost:${PORT}...`)
);