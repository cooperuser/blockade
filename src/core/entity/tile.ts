import type { Block } from "./block";

export type TileProps = {
	color?: number;
	cushion?: boolean;
};

export class Tile {
	public color: number;
	public cushion: boolean;

	constructor(props: TileProps = { color: 0, cushion: false }) {
		this.color = props.color;
		this.cushion = props.cushion;
	}

	canMoveTo(block: Block): boolean {
		if (this.color === 0) return true;
		if (block.color === 0) return true;
		return block.color === this.color;
	}
}
