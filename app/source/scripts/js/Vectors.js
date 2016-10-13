/**
 * Created by Cooper Anderson on 9/9/16 AD.
 */

class Vector2 {
	constructor(x=0, y=0) {
		this.x = x;
		this.y = y;
	}
	static Add(a, b) {
		return new Vector2(a.x + b.x, a.y + b.y);
	}
	static Sub(a, b) {
		return new Vector2(a.x - b.x, a.y - b.y);
	}
	static Mult(a, b) {
		return new Vector2(a.x * b, a.y * b);
	}
	static Div(a, b) {
		return (b == 0) ? new Vector2(a.x / b, a.y / b) : new Vector2();
	}
	static Rotate(vector, degrees=90) {
		var rotated = new Vector2();
		rotated.x = Math.round(vector.x * Math.cos(degrees * 0.0174533) - vector.y * Math.sin(degrees * 0.0174533));
		rotated.y = Math.round(vector.x * Math.sin(degrees * 0.0174533) + vector.y * Math.cos(degrees * 0.0174533));
		return rotated;
	}
	static FromList(list) {
		return new Vector2(list[0], list[1]);
	}
	static ToList(vector) {
		return [vector.x, vector.y];
	}
	static ToString(vector) {
		return `${vector.x}-${vector.y}`;
		//return `(${vector.x}, ${vector.y})`
	}
	static FromDirection(direction) {
		if (direction == "up") {
			return new Vector2(0, -1);
		} else if (direction == "down") {
			return new Vector2(0, 1);
		} else if (direction == "left") {
			return new Vector2(-1, 0);
		} else if (direction == "right") {
			return new Vector2(1, 0);
		}
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