import type { Level } from "./level";
import type { Pair } from "./util";
import { Vector } from "./vector";

export type Shape = Pair<Vector, BlockType>[];

export class Block {
	public position: Vector;
	public shape: Shape;

	constructor(position: Vector, type: BlockType) {
		this.position = position;
		this.shape = [[new Vector(), type]];
	}

	/**
	 * Add a new block to this group
	 * @param {Vector} position - The level position of the block
	 * @param {BlockType} type - The type of block being added
	 * @returns {number} The number of blocks or `-1`
	 */
	addBlock(position: Vector, type: BlockType): number {
		const pos = Vector.sub(position, this.position);
		if (this.shape.some(p => p[0].equals(pos))) return -1;
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
	 * @param {Vector} direction - The direction being moved in
	 * @param {Level} level - The level being played on
	 * @param {Shape} front - The front-facing/collidable blocks
	 * @returns {boolean} Whether the block can move
	 */
	canMove(direction: Vector, level: Level, front?: Shape): boolean {
		if (front === undefined) front = this.getFront(direction);
		return !front.some(pair => {
			const from = Vector.add(pair[0], this.position);
			const to = Vector.add(from, direction);
			return !level.validMove(from, to, pair[1]);
		});
	}

	/**
	 * Move this block in the given direction
	 * @param {Vector} direction - The direction being moved in
	 * @param {Level} level - The level being played on
	 * @returns {number} How many tiles the block moved
	 */
	move(direction: Vector, level: Level): number {
		const front = this.getFront(direction);
		/*eslint-disable no-constant-condition*/
		for (let i = 0; true; i++) {
			if (!this.canMove(direction, level, front)) return i;
			this.position = this.position.add(direction);
		}
	}
}

export abstract class BlockType {
	equals(other: BlockType): boolean {
		return this === other;
	}
}
