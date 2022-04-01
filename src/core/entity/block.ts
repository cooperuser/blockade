export type BlockProps = {
	color?: number;
	hollow?: boolean;
	group?: number;
};

export class Block {
	public color: number;
	public hollow: boolean;

	constructor(props: BlockProps = { color: 0, hollow: false, group: 0 }) {
		this.color = props.color;
		this.hollow = props.hollow;
	}

	equals(other: Block): boolean {
		return this.color === other.color;
	}
}
