import type { BlockGroup } from "./blockgroup";
import type { Block, BlockProps } from "./entity/block";
import type { Plate, PlateProps } from "./entity/plate";
import type { Tile, TileProps } from "./entity/tile";
import type { Wall, WallProps } from "./entity/wall";
import type { Vector } from "./vector";

export class Level {
	tiles: Tile[];
	plates: Plate[];
	blocks: BlockGroup[];
	walls: {
		horz: Wall[][];
		vert: Wall[][];
	};

	constructor(data: LevelData) {}

	private addTile(params: TileProps, position: Vector) {}

	private addBlock(params: BlockProps, position: Vector) {}

	private addPlate(params: PlateProps, position: Vector) {}

	validMove(from: Vector, to: Vector, type: Block, moves: number): boolean {
		return true;
	}
}

type RawVector = [number, number];
type LevelData = { layout: LevelObject[] };
type LevelObject = LevelTile | LevelBlock | LevelPlate | LevelWall;
type LevelTile = { object: "tile"; params: TileProps; at: RawVector[] };
type LevelBlock = { object: "block"; params: BlockProps; at: RawVector[] };
type LevelPlate = { object: "plate"; params: PlateProps; at: RawVector[] };
type LevelWall = { object: "wall"; params: WallProps; at: RawVector[] };
