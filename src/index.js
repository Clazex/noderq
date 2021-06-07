#!/usr/bin/env node

const spawn = require("child_process").spawnSync;

const { argv } = process;

if (argv.length < 3) {
	throw new Error("Expected more parameters");
}

//#region Argument parsing

/** @type { Record<string, string | null> } */
const magicCharToModuleMap = {
	b: "@babel/register",
	c: "coffeescript/register",
	e: "esm",
	l: null,
	t: "ts-node/register",
	T: "ts-node/register/transpile-only",
	v: null
};


const magicString = argv[2];
const magicChars = new Set(magicString.split(""));

const local = magicChars.has("l");
const cache = magicChars.has("v");


/** @type { string[] } */
let modules = [];
magicChars.forEach((char) => {
	const value = magicCharToModuleMap[char];
	if (value) {
		modules.push(value);
	}
});

if (cache) {
	modules.unshift("v8-compile-cache");
}


const args = [
	...modules.map((mod) => ["-r", mod]).flat(1),
	...argv.slice(3)
];

//#endregion

if (!local) {
	spawn(argv[0], args, { stdio: "inherit" });
} else {
	spawn("npx", ["--no-install", "node", ...args], { stdio: "inherit", shell: true });
}
