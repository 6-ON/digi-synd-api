module.exports = {
	preset: "ts-jest",
	testEnvironment: "node",
	transform: {
		"^.+\\.(t|j)s?$": "@swc/jest",
	},
	moduleNameMapper: {
		"@/(.*)": "<rootDir>/src/$1",
	},
};
