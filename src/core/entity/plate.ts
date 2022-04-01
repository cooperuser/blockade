import type { Block } from "./block";

export type PlateProps = {
	color?: number;
};

export class Plate {
	public color: number;

	constructor(props: PlateProps = { color: 0 }) {
		this.color = props.color;
	}

	isPressed(block: Block): boolean {
		if (this.color === 0) return true;
		if (block.color === 0) return true;
		return block.color === this.color;
	}
}
