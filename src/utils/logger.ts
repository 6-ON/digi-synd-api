import winston, { Logger, createLogger, format } from "winston";

const logFormat = format.combine(format.timestamp(), format.prettyPrint());

const infoFilter = format((info) => (info.level === "info" ? info : false));

export const logger: Logger = createLogger({
	format: logFormat,
	transports: [
		new winston.transports.File({
			filename: "logs/error.log",
			level: "error",
		}),
		new winston.transports.File({
			filename: "logs/app.log",
			level: "info",
			format: infoFilter(),
		}),
		new winston.transports.File({
			filename: "logs/debug.log",
			level: "debug",
		}),
	],
});
