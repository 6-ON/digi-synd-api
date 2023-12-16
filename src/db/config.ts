import  { Connection, connection } from "mongoose";
import { logger } from "../utils";
import { connect } from "mongoose";

export const db: Connection = connection;
db.set("debug", (coll, method, query, doc) => {
	console.debug(JSON.stringify(method, null, 2));
	console.debug(JSON.stringify(query, null, 2));
});
db.on("error", (err) => {
	console.log(err);
	process.exit(1);
});
db.once("open", () => {
	logger.info("Connected to MongoDB");
});
db.once("close", () => {
	logger.info("Closed connection to MongoDB");
});

// ------Connect to MongoDB------
const { MONGODB_URI } = process.env;
export const connectToDb = async () => {
	await connect(MONGODB_URI!);
};
