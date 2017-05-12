/**
 * Created by Cooper Anderson on 9/9/16 AD.
 */

const {Vector2} = require(`${__dirname}/../Vectors`);

class Wire {
	constructor(position = new Vector2(), color = "white") {
		this.position = position;
		this.color = color;
		this.passable = true;
	}
}

class Gate {
	constructor(position = new Vector2()) {
		this.position = position;
		this.passable = true;
	}
}

module.exports = {Wire, Gate};