import "dotenv/config";
import { app } from "./app/app";

const port = process.env.API_PORT;

console.log("Hello, world!");

const server = app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
