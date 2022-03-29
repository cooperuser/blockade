import type { Block, BlockType } from "./block";
import type { Sign } from "./util";
import type { Vector } from "./vector";

export class Level {
	private tiles: Tile[];
	private plates: Plate[];
	private blocks: Block[];
	private walls: {
		horz: Wall[][];
		vert: Wall[][];
	};

	constructor() {
		this.blocks = [];
	}

	validMove(from: Vector, to: Vector, type: BlockType, moves: number): boolean {
		return true;
	}
}

export class Tile {
	public color: number;
}

export class Wall {
	public color: number;
	public side: Sign;
}

export class Plate {
	public color: number;
}
