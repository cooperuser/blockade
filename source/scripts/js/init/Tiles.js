/**
 * Created by Cooper Anderson on 9/12/16 AD.
 */

const fs = require("fs");

tiles = {}

$.extend(tiles, require(`${__dirname}/../tiles/Tile`));

fs.readdirSync(`${__dirname}/../tiles`).forEach(function(item, index) {
	if (item != "Tile.js") {
		var file = item.split(".js")[0];
		$.extend(tiles, require(`${__dirname}/../tiles/${file}`));
	}
});

module.exports = tiles;