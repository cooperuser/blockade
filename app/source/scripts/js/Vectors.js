/**
 * Created by Cooper Anderson on 9/9/16 AD.
 */

class Vector2 {
	constructor(x=0, y=0) {
		this.x = x;
		this.y = y;
	}
}

class Vector3 {
	constructor(x=0, y=0, z=0) {
		this.x = x;
		this.y = y;
		this.z = z;
	}
}

module.exports = {Vector2, Vector3};