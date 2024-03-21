import express, { Express } from "express";
import { router } from "../router/router";

const app: Express = express();

app.use(express.json());
app.set("port", process.env.PORT || 3003);
app.set("host", process.env.HOST || "localhost");
app.set("env", process.env.NODE_ENV || "development");
app.set("json spaces", 2);
app.set("trust proxy", true);

app.use("/api", router);
export { app };
