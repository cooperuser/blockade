import type { Sign } from "../util";

export type WallProps = {
	color?: number;
	side?: Sign;
};

export class Wall {
	public color: number;
	public side: Sign;

	constructor(props: WallProps = { color: 0, side: 0 }) {
		this.color = props.color;
		this.side = props.side;
	}
}
