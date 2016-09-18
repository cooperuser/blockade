/**
 * Created by Cooper Anderson on 9/9/16 AD.
 */

class Vector2 {
	constructor(x=0, y=0) {
		this.x = x;
		this.y = y;
	}
	static FromList(list) {
		return new Vector2(list[0], list[1]);
	}
	static ToString(vector) {
		return `(${vector.x}, ${vector.y})`
	}
}

class Vector3 {
	constructor(x=0, y=0, z=0) {
		this.x = x;
		this.y = y;
		this.z = z;
	}
	static FromList(list) {
		return new Vector3(list[0], list[1], list[2]);
	}
	static ToString(vector) {
		return `(${vector.x}, ${vector.y}, ${vector.z})`
	}
}

module.exports = {Vector2, Vector3};