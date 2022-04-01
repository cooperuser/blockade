import type { Block } from "./block";

export type TileProps = {
	color?: number;
	cushion?: boolean;
};

export class Tile {
	public color: number;
	public cushion: boolean;

	constructor({ color = 0, cushion = false }: TileProps = {}) {
		this.color = color;
		this.cushion = cushion;
	}

	canMoveTo(block: Block): boolean {
		if (this.color === 0) return true;
		if (block.color === 0) return true;
		return block.color === this.color;
	}
}
