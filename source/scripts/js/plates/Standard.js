/**
 * Created by Cooper Anderson on 9/12/16 AD.
 */

const {Plate} = require(`${__dirname}/Plate`);
const {Vector2} = require(`${__dirname}/../Vectors`);

class Standard extends Plate {
	constructor(attributes={}) {
		super(attributes);
	}
}

module.exports = {Standard}