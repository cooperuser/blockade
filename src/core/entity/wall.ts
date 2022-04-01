import type { Sign } from "../util";

export type WallProps = {
	color?: number;
	side?: Sign;
};

export class Wall {
	public color: number;
	public side: Sign;

	constructor({ color = 0, side = 0 }: WallProps = {}) {
		this.color = color;
		this.side = side;
	}
}
