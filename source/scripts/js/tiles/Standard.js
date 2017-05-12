/**
 * Created by Cooper Anderson on 9/12/16 AD.
 */

const {Tile} = require(`${__dirname}/Tile`);
const {Vector2} = require(`${__dirname}/../Vectors`);

class Standard extends Tile {
	constructor(attributes = {}) {
		super(attributes);
	}
}

module.exports = {Standard};