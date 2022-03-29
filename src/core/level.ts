import type { Block, BlockType } from "./block";
import type { Vector } from "./vector";

export class Level {
	private tiles: Tile[];
	private plates: Plate[];
	private blocks: Block[];

	constructor() {
		this.blocks = [];
	}

	validMove(from: Vector, to: Vector, type: BlockType): boolean {
		return true;
	}
}

export class Cell {}
export class Tile {}
export class Plate {}
