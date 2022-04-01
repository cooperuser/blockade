import type { Block } from "./entity/block";
import type { Level } from "./level";
import type { Pair } from "./util";
import { Vector, type VectorHash } from "./vector";

export type Shape = Pair<Vector, Block>[];

export class BlockGroup {
	public position: Vector;
	public shape: Shape;
	public occupies: Set<VectorHash>;

	constructor(position: Vector, type: Block) {
		this.position = position;
		this.shape = [[new Vector(), type]];
		this.occupies = new Set([position.hash()]);
	}

	/**
	 * Add a new block to this group
	 * @param {Vector} position - The level position of the block
	 * @param {Block} type - The type of block being added
	 * @returns {number} The number of blocks or `-1`
	 */
	addBlock(position: Vector, type: Block): number {
		const pos = Vector.sub(position, this.position);
		if (this.shape.some(p => p[0].equals(pos))) return -1;
		this.occupies.add(position.hash());
		return this.shape.push([pos, type]);
	}

	/**
	 * Get the subset of blocks that are front-facing/collidable
	 * @param {Vector} direction - The direction being moved in
	 * @returns {Shape} The subset of collidable blocks
	 */
	getFront(direction: Vector): Shape {
		return this.shape.filter(pair => {
			const pos = Vector.add(pair[0], direction);
			const p = this.shape.find(p => p[0].equals(pos));
			return p === undefined || !p[1].equals(pair[1]);
		});
	}

	/**
	 * Can this block move in the given direction?
	 * @param {Vector} dir - The direction being moved in
	 * @param {Level} level - The level being played on
	 * @param {Shape} front - The front-facing/collidable blocks
	 * @param {number} moves - How many moves have been made so far
	 * @returns {boolean} Whether the block can move
	 */
	canMove(dir: Vector, level: Level, front?: Shape, moves?: number): boolean {
		if (front === undefined) front = this.getFront(dir);
		if (moves === undefined) moves = 0;
		return !front.some(pair => {
			const from = Vector.add(pair[0], this.position);
			const to = Vector.add(from, dir);
			return !level.validMove(from, to, pair[1], moves);
		});
	}

	/**
	 * Move this block in the given direction
	 * @param {Vector} direction - The direction being moved in
	 * @param {Level} level - The level being played on
	 * @returns {number} How many tiles the block moved
	 */
	move(direction: Vector, level: Level): number {
		/*eslint-disable no-constant-condition*/

		let moves: number;
		const front = this.getFront(direction);
		for (moves = 0; true; moves++) {
			if (!this.canMove(direction, level, front, moves)) break;
			this.position = this.position.add(direction);
		}

		const spots = this.shape.map(this.position.addPair);
		this.occupies = new Set(spots.map(v => v.hash()));
		return moves;
	}
}
