/**
 * Created by Cooper Anderson on 9/12/16 AD.
 */

const fs = require("fs");

plates = {}

$.extend(plates, require(`${__dirname}/../plates/Plate`));

fs.readdirSync(`${__dirname}/../plates`).forEach(function(item, index) {
	if (item != "Plate.js") {
		var file = item.split(".js")[0];
		$.extend(plates, require(`${__dirname}/../plates/${file}`));
	}
});

module.exports = plates;