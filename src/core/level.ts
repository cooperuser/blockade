import { BlockGroup } from "./blockgroup";
import { Block, type BlockProps } from "./entity/block";
import { Plate, type PlateProps } from "./entity/plate";
import { Tile, type TileProps } from "./entity/tile";
import { Wall, type WallProps } from "./entity/wall";
import type { Pair } from "./util";
import { Vector, type RawVector } from "./vector";

const UP = Vector.up.div(2);
const DOWN = Vector.down.div(2);
const LEFT = Vector.left.div(2);
const RIGHT = Vector.right.div(2);
type Entity<T> = Pair<T, Vector>;

class Cell {
	public tile?: Tile;
	public plate?: Plate;
	public walls: {
		up?: Wall;
		down?: Wall;
		left?: Wall;
		right?: Wall;
	};
}

export class Level {
	tiles: Entity<Tile>[];
	plates: Entity<Plate>[];
	walls: {
		horz: Entity<Wall>[];
		vert: Entity<Wall>[];
	};

	map: Cell[][];
	groups: Map<number, number>;
	blocks: BlockGroup[];
	size: Vector;

	constructor(data: LevelData) {
		this.tiles = [];
		this.plates = [];
		this.walls = { horz: [], vert: [] };
		this.groups = new Map();
		this.blocks = [];

		const min = new Vector(Infinity, Infinity);
		const max = new Vector(-Infinity, -Infinity);
		for (const lo of data.layout) {
			for (const p of lo.at) {
				const pos = Vector.fromRaw(p);
				min.x = Math.min(min.x, pos.x);
				min.y = Math.min(min.y, pos.y);
				max.x = Math.max(max.x, pos.x);
				max.y = Math.max(max.y, pos.y);
			}
		}
		this.size = Vector.sub(max, min);
		this.size = this.size.add(new Vector(1, 1));
		this.map = this.size.makeArray(() => new Cell());

		const adds = {
			tile: this.addTile.bind(this),
			block: this.addBlock.bind(this),
			plate: this.addPlate.bind(this),
			wall: this.addWall.bind(this)
		};

		for (const { type, props, at } of data.layout) {
			if (!(type in adds)) throw new Error(`Unknown type: ${type}`);
			at.forEach(p => adds[type](props, Vector.fromRaw(p)));
		}
	}

	private getCell(position: Vector): Cell | undefined {
		if (position.x < 0 || position.x >= this.size.x) return undefined;
		if (position.y < 0 || position.y >= this.size.y) return undefined;
		return this.map[position.y][position.x];
	}

	private addTile(props: TileProps, position: Vector) {
		const tile = new Tile(props);
		this.getCell(position).tile = tile;
		this.tiles.push([tile, position]);
	}

	private addBlock(props: BlockProps, position: Vector) {
		const block = new Block(props);
		if (block.group === 0) {
			this.blocks.push(new BlockGroup(position, block));
			return;
		}

		const group = this.groups.get(block.group);
		if (group === undefined) {
			this.groups.set(block.group, this.blocks.length);
			this.blocks.push(new BlockGroup(position, block));
			return;
		} else this.blocks[group].addBlock(position, block);
	}

	private addPlate(props: PlateProps, position: Vector) {
		const plate = new Plate(props);
		this.getCell(position).plate = plate;
		this.plates.push([plate, position]);
	}

	private addWall(props: WallProps, position: Vector) {
		const wall = new Wall(props);
		if (position.x % 1 !== 0) {
			const left = this.getCell(position.add(LEFT));
			const right = this.getCell(position.add(RIGHT));
			if (left !== undefined) left.walls.right = wall;
			if (right !== undefined) right.walls.left = wall;
			this.walls.vert.push([wall, position]);
		} else {
			const up = this.getCell(position.add(UP));
			const down = this.getCell(position.add(DOWN));
			if (up !== undefined) up.walls.down = wall;
			if (down !== undefined) down.walls.up = wall;
			this.walls.horz.push([wall, position]);
		}
	}

	validMove(from: Vector, to: Vector, type: Block, moves: number): boolean {
		return true;
	}
}

type LevelData = { layout: LevelObject[] };
type LevelObject = {
	type: "tile" | "block" | "plate" | "wall";
	props: TileProps | BlockProps | PlateProps | WallProps;
	at: RawVector[];
};
