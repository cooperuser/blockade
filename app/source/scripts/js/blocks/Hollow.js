/**
 * Created by Cooper Anderson on 9/12/16 AD.
 */

const {Block} = require(`${__dirname}/Block`);
const {Vector2} = require(`${__dirname}/../Vectors`);

class HollowBlock extends Block {
	constructor(attributes={}) {
		super(attributes);
	}
}

module.exports = {HollowBlock}