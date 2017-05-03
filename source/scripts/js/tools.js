const fs = require("fs");

function access(path) {
	let dirs = path.split("/");
	if (!dirs[0]) {
		dirs = dirs.slice(1);
		dirs[0] = "/" + dirs[0];
	}
	for (let i = 0; i < dirs.length; i++) {
		let current = dirs.slice(0, i+1).join("/");
		if (i != dirs.length - 1) {
			try {
				fs.readdirSync(current);
			} catch(error) {
				fs.mkdirSync(current);
			}
		} else {
			try {
				return String(fs.readFileSync(current));
			} catch(error) {
				// fs.closeSync(fs.openSync(current, "a"));
				fs.appendFileSync(current, "");
				return String(fs.readFileSync(current));
			}
		}
	}
}

function write(path, data) {
	let dirs = path.split("/");
	if (!dirs[0]) {
		dirs = dirs.slice(1);
		dirs[0] = "/" + dirs[0];
	}
	for (let i = 0; i < dirs.length; i++) {
		let current = dirs.slice(0, i+1).join("/");
		if (i != dirs.length - 1) {
			try {
				fs.readdirSync(current);
			} catch(error) {
				fs.mkdirSync(current);
			}
		} else {
			fs.writeFileSync(current, data);
		}
	}
}

function readJSON(path) {
	try {
		return JSON.parse(fs.readFileSync(path));
	} catch(error) {
		return undefined;
	}
}

function retrieve(item, attributes) {
	if (typeof attributes === "string") attributes = attributes.split(".");
	for (var i = 0; i < attributes.length; i++) {
		if (item === undefined) return item;
		item = item[attributes[i]];
	}
	return item;
}

module.exports.access = access;
module.exports.write = write;
module.exports.readJSON = readJSON;
module.exports.retrieve = retrieve;