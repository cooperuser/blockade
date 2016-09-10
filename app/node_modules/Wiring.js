/**
 * Created by Cooper Anderson on 9/9/16 AD.
 */

class Wire {
	constructor(position=new Vector2(), color="white") {
		this.position = position;
		this.color = color;
		this.passable = true;
	}
}

class Gate {
	constructor(position=new Vector2()) {
		this.position = position;
		this.passable = true;
	}
}