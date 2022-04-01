export type BlockProps = {
	color?: number;
	hollow?: boolean;
	group?: number;
};

export class Block {
	public color: number;
	public hollow: boolean;
	public group: number;

	constructor({ color = 0, hollow = false, group = 0 }: BlockProps = {}) {
		this.color = color;
		this.hollow = hollow;
		this.group = group;
	}

	equals(other: Block): boolean {
		return this.color === other.color;
	}
}
