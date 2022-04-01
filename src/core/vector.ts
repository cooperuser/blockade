import type { Pair } from "./util";

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

	addPair<U>(pair: Pair<Vector, U>): Vector {
		return new Vector(this.x + pair[0].x, this.y + pair[0].y);
	}

	sub(other: Vector): Vector {
		return new Vector(this.x - other.x, this.y - other.y);
	}

	mult(n: number): Vector {
		return new Vector(this.x * n, this.y * n);
	}

	div(n: number): Vector {
		if (n === 0) return new Vector(0, 0);
		return new Vector(this.x / n, this.y / n);
	}

	equals(other: Vector): boolean {
		return this.x === other.x && this.y === other.y;
	}

	hash(): VectorHash {
		return `${this.x}:${this.y}`;
	}

	makeArray<T>(fn: (v: Vector) => T): T[][] {
		const a = Array.from({ length: this.y }, () => Array(this.x).fill(null));
		return a.map((row, y) => row.map((_, x) => fn(new Vector(x, y))));
	}

	static add(a: Vector, b: Vector): Vector {
		return new Vector(a.x + b.x, a.y + b.y);
	}

	static sub(a: Vector, b: Vector): Vector {
		return new Vector(a.x - b.x, a.y - b.y);
	}

	static fromRaw(raw: RawVector): Vector {
		return new Vector(raw[0], raw[1]);
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
export type RawVector = [number, number];
