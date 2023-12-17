import app from "./app";
import { connectToDb } from "@/db";
const port = process.env.PORT || 3000;

connectToDb().then(() => {
	console.log("Connected to database");
	app.listen(port, () => {
		console.log(`Listening on port ${port}`);
	});
});
