export class Vector {
	public x: number;
	public y: number;

	static up = new Vector(0, -1);
	static down = new Vector(0, 1);
	static left = new Vector(-1, 0);
	static right = new Vector(1, 0);
	static zero = new Vector(0, 0);

	constructor(x: number = 0, y: number = 0) {
		this.x = x;
		this.y = y;
	}

	add(other: Vector): Vector {
		return new Vector(this.x + other.x, this.y + other.y);
	}

	sub(other: Vector): Vector {
		return new Vector(this.x - other.x, this.y - other.y);
	}

	equals(other: Vector): boolean {
		return this.x === other.x && this.y === other.y;
	}

	hash(): VectorHash {
		return `${this.x}:${this.y}`;
	}

	static add(a: Vector, b: Vector): Vector {
		return new Vector(a.x + b.x, a.y + b.y);
	}

	static sub(a: Vector, b: Vector): Vector {
		return new Vector(a.x - b.x, a.y - b.y);
	}

	static fromHash(hash: VectorHash): Vector {
		try {
			const [x, y] = hash.split(":").map(Number);
			return new Vector(x, y);
		} catch (e) {
			throw new Error(`Invalid Vector hash: ${hash}`);
		}
	}
}

export type VectorHash = string;
