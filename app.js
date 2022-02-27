import express from "express";
import cors from "cors";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";

// ------------------------------------------------------

import { crud, sequelizeCrud } from "./src/utils/crud/express-crud-router";
import models from "./src/utils/database/init-models";
import errors from "./src/utils/error/errors.middleware.js";

// ------------------------------------------------------

const app = express();

// ------------------------------------------------------

// Middlewares
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// ------------------------------------------------------

app.use(crud("//users", sequelizeCrud(models.users)));
// app.use(crud("//users", sequelizeCrud(models["users"])));

// ------------------------------------------------------

// Error Handlers
//---------------------------------------------------
// catch 404 and forward to error handler
app.use(errors.catchNotFound);
// error handler
app.use(errors.errorHandler);

//---------------------------------------------------

export default app;
