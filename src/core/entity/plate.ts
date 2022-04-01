import type { Block } from "./block";

export type PlateProps = {
	color?: number;
};

export class Plate {
	public color: number;

	constructor({ color = 0 }: PlateProps = {}) {
		this.color = color;
	}

	isPressed(block: Block): boolean {
		if (this.color === 0) return true;
		if (block.color === 0) return true;
		return block.color === this.color;
	}
}
