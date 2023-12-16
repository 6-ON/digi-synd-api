// setup configs
import "../config";
import { connectToDb, db } from "@/db";

const scripts = ["create-admin"];
function printScripts(scripts: string[]) {
	console.log("Available scripts:");
	scripts.forEach((script) => console.log(`- ${script}`));
}
async function runScript(script: string) {
	console.log(`Running ${script}...`);
	const module = await import(`./${script}`);
	await module.default();
}

async function runScripts(...scripts: string[]) {
	await connectToDb();
	await Promise.all(scripts.map((s) => runScript(s)));
	await db.close();
}

// function promptScript() {
// 	async (answer) => {
// 		if (answer === "all") return await runScripts(answer);
// 		else if (answer === "list") console.log(scripts);
// 		else if (scripts.includes(answer)) return await runScripts(answer);
// 		else console.log("Invalid script name");
// 		promptScript();
// 	};
// }

function help(invalid: boolean = false) {
	if (invalid) console.log("Invalid script name");
	console.log("Usage:");
	console.log("- To run a specific script: npm run scripts <script-name>");
	console.log("- To run all scripts: npm run scripts all");
	console.log("- To list available scripts: npm run scripts list");
}
async function init(args: string[]) {
	console.clear();
	if (!args.length || args.includes("help")) return help();
	if (args.includes("all")) return await runScripts(...scripts);
	if (args.includes("list")) return printScripts(scripts);
	if (args.every((e) => scripts.includes(e))) return await runScripts(...args);
	else return help(true);
}

init(process.argv.slice(2));
