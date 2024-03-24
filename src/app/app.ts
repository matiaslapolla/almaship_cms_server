import express, { Express } from "express";
import { router } from "../router/router";
var cors = require("cors");

const corsOptions = { credentials: true, origin: true };
const app: Express = express();

app.use(express.json({ limit: "10mb" }));
app.set("port", process.env.PORT || 3003);
app.set("host", process.env.HOST || "localhost");
app.set("env", process.env.NODE_ENV || "development");
app.set("json spaces", 2);
app.set("trust proxy", true);
app.use(cors({ origin: "*" }));
app.use("/api", router);
export { app };
