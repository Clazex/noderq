#!/usr/bin/env node

const spawn = require("child_process").spawnSync;

//#region Util Functions

/**
 * Distinct values of an array
 * @template T
 * @param {T[]} array
 * @return {T[]} distinctedArray
 */
function distinct(array) {
	return Array.from(new Set(array));
}

//#endregion

const { argv } = process;

if (argv.length < 3) {
	throw new Error("Expected more parameters");
}

//#region Argument parsing

const magicString = argv[2];

const local = /l/u.test(magicString);
const cache = /v/u.test(magicString);

const modules = distinct(magicString.split(""))
	.map((i) => {
		switch (i) {
			case "b":
				return "@babel/register";
			case "c":
				return "coffeescript/register"
			case "e":
				return "esm";
			case "l":
				return null;
			case "t":
				return "ts-node/register";
			case "T":
				return "ts-node/register/transpile-only";
			case "v":
				return null;
			default:
				return undefined;
		}
	})
	.filter((i) => i);

const args = [
	...cache
		? ["-r", "v8-compile-cache"]
		: [],
	...modules.reduce((a, i) => [...a, "-r", i], []),
	...argv.slice(3)
];

//#endregion

if (!local) {
	spawn(argv[0], args, { stdio: "inherit" });
} else {
	spawn("npx", ["--no-install", "node", ...args], { stdio: "inherit", shell: true });
}
