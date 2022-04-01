import { Level } from "../level";
import level1data from "../../../static/levels/1.json";

describe("level loading", () => {
	describe("level 1", () => {
		/*eslint-disable @typescript-eslint/no-explicit-any*/
		const level = new Level(level1data as any);

		it("has the correct number of tiles", () => {
			expect(level.tiles.length).toBe(12);
		});

		it("has the correct number of plates", () => {
			expect(level.plates.length).toBe(1);
		});

		it("has the correct number of blocks", () => {
			expect(level.blocks.length).toBe(1);
		});

		it("has tiles where tiles should be", () => {
			expect(level.map[0][0].tile).toBeUndefined();
			expect(level.map[0][4].tile).toBeUndefined();
			expect(level.map[2][0].tile).toBeUndefined();
		});

		it("has gaps where no tiles should be", () => {
			expect(level.map[0][1].tile).not.toBeUndefined();
			expect(level.map[0][2].tile).not.toBeUndefined();
			expect(level.map[0][3].tile).not.toBeUndefined();
			expect(level.map[1][0].tile).not.toBeUndefined();
			expect(level.map[1][1].tile).not.toBeUndefined();
			expect(level.map[1][2].tile).not.toBeUndefined();
			expect(level.map[1][3].tile).not.toBeUndefined();
			expect(level.map[1][4].tile).not.toBeUndefined();
			expect(level.map[2][1].tile).not.toBeUndefined();
			expect(level.map[2][2].tile).not.toBeUndefined();
			expect(level.map[2][3].tile).not.toBeUndefined();
			expect(level.map[2][4].tile).not.toBeUndefined();
		});

		it("has plates where plates should be", () => {
			expect(level.map[0][0].plate).toBeUndefined();
			expect(level.map[0][1].plate).toBeUndefined();
			expect(level.map[0][2].plate).toBeUndefined();
			expect(level.map[0][3].plate).toBeUndefined();
			expect(level.map[0][4].plate).toBeUndefined();
			expect(level.map[1][0].plate).not.toBeUndefined();
			expect(level.map[1][1].plate).toBeUndefined();
			expect(level.map[1][2].plate).toBeUndefined();
			expect(level.map[1][3].plate).toBeUndefined();
			expect(level.map[1][4].plate).toBeUndefined();
			expect(level.map[2][0].plate).toBeUndefined();
			expect(level.map[2][1].plate).toBeUndefined();
			expect(level.map[2][2].plate).toBeUndefined();
			expect(level.map[2][3].plate).toBeUndefined();
			expect(level.map[2][4].plate).toBeUndefined();
		});
	});

	describe("simple block groups", () => {
		const level = new Level({
			layout: [
				{
					type: "tile",
					props: {},
					at: [
						[0, 0],
						[1, 0],
						[2, 0],
						[0, 1],
						[1, 1],
						[2, 1],
						[0, 2],
						[1, 2],
						[2, 2]
					]
				},
				{
					type: "block",
					props: {},
					at: [
						[0, 0],
						[0, 1]
					]
				},
				{
					type: "block",
					props: { group: 1 },
					at: [
						[1, 0],
						[1, 1]
					]
				}
			]
		});

		it("condenses grouped blocks into groups", () => {
			expect(level.blocks.length).toBe(3);
		});

		it("has the correct group sizes", () => {
			expect(level.blocks[0].shape.length).toBe(1);
			expect(level.blocks[1].shape.length).toBe(1);
			expect(level.blocks[2].shape.length).toBe(2);
		});
	});
});
