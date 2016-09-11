/**
 * Created by Cooper Anderson on 9/9/16 AD.
 */

class Plate {
	constructor(position=new Vector2(), color="white") {
		this.position = position;
		this.color = color;
		this.passable = true;
		this.active = false;
		this.class = this.constructor.name;
		this.objectType = "Plate";
	}
}

class StandardPlate extends Plate {
	constructor(position=new Vector2(), color="white") {
		super(position, color);
	}
}

module.exports = {Plate, StandardPlate};