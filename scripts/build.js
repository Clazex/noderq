import { emptyDir, readFile, writeFile } from "fs-extra";
import { minify } from "terser";

emptyDir("bin")
	.then(() => readFile("./src/index.js", "utf8"))
	.then((src) => minify(
		{
			"src/index.js": src
		},
		{
			compress: {
				passes: 5
			},
			ecma: 2020,
			sourceMap: {
				includeSources: true,
				filename: "src/index.js",
				url: "index.js.map"
			},
			toplevel: true
		}
	))
	.then(({ code, map }) => Promise.all([
		writeFile("bin/index.js", code),
		writeFile("bin/index.js.map", map)
	]))
