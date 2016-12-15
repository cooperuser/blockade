function retrieve(object, attributes) {
	if (typeof attributes === "string") attributes = attributes.split(".");
	for (var i = 0; i < attributes.length; i++) {
		if (object === undefined) return object;
		object = object[attributes[i]];
	}
	return object;
}

function readJSON(path) {
	try {
		return JSON.parse(require("fs").readFileSync(path));
	} catch(error) {
		return undefined;
	}
}

module.exports.retrieve = retrieve;
module.exports.readJSON = readJSON;