/**
 * Created by Cooper Anderson on 9/12/16 AD.
 */

const fs = require("fs");

blocks = {}

$.extend(blocks, require(`${__dirname}/../blocks/Block`));

fs.readdirSync(`${__dirname}/../blocks`).forEach(function(item, index) {
	if (item != "Block.js") {
		var file = item.split(".js")[0];
		$.extend(blocks, require(`${__dirname}/../blocks/${file}`));
	}
});

module.exports = blocks;