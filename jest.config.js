/* eslint-disable no-undef */
module.exports = {
	preset: "ts-jest",
	testEnvironment: "node",
	moduleNameMapper: {
		"@app/(.*)": "<rootDir>/src/$1",
	},
};
