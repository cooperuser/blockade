import { Block, BlockType, type Shape } from "../block";
import { Vector } from "../vector";

class Standard extends BlockType {}
const type = new Standard();

describe("Block", () => {
	it("should be defined", () => {
		expect(Block).toBeDefined();
	});

	it("gets created at (0, 0)", () => {
		const block = new Block(new Vector(1, 2), type);
		expect(block.shape.length).toBe(1);

		const pair = block.shape[0];
		expect(pair[0]).toEqual(new Vector(0, 0));
		expect(pair[1]).toEqual(type);
	});

	it("can have blocks appended", () => {
		const block = new Block(new Vector(1, 1), type);
		const sizeAfterB = block.addBlock(new Vector(1, 2), type);
		expect(sizeAfterB).toBe(2);
		expect(block.shape[1][0]).toEqual(new Vector(0, 1));
		expect(block.shape[1][1]).toEqual(type);

		const sizeAfterB2 = block.addBlock(new Vector(1, 2), type);
		expect(block.shape.length).toBe(2);
		expect(sizeAfterB2).toBe(-1);
		expect(block.shape[1][0]).toEqual(new Vector(0, 1));
		expect(block.shape[1][1]).toEqual(type);

		const sizeAfterC = block.addBlock(new Vector(2, 1), type);
		expect(block.shape.length).toBe(3);
		expect(sizeAfterC).toBe(3);
		expect(block.shape[2][0]).toEqual(new Vector(1, 0));
		expect(block.shape[2][1]).toEqual(type);
	});
});

describe("get front-facing blocks", () => {
	const contains = (f: Shape, v: Vector) => f.some(p => p[0].equals(v));
	const block = new Block(new Vector(0, 0), type);
	const outlier = new Vector(2, 2);
	block.addBlock(Vector.up, type);
	block.addBlock(Vector.down, type);
	block.addBlock(Vector.left, type);
	block.addBlock(Vector.right, type);
	block.addBlock(outlier, type);

	describe("when moving up", () => {
		const front = block.getFront(Vector.up);
		it("includes the top block", () => {
			expect(contains(front, Vector.up)).toBe(true);
		});
		it("includes the left block", () => {
			expect(contains(front, Vector.left)).toBe(true);
		});
		it("includes the right block", () => {
			expect(contains(front, Vector.right)).toBe(true);
		});
		it("includes the outlier block", () => {
			expect(contains(front, outlier)).toBe(true);
		});
		it("includes no other blocks", () => {
			expect(front.length).toBe(4);
		});
	});

	describe("when moving down", () => {
		const front = block.getFront(Vector.down);
		it("includes the bottom block", () => {
			expect(contains(front, Vector.down)).toBe(true);
		});
		it("includes the left block", () => {
			expect(contains(front, Vector.left)).toBe(true);
		});
		it("includes the right block", () => {
			expect(contains(front, Vector.right)).toBe(true);
		});
		it("includes the outlier block", () => {
			expect(contains(front, outlier)).toBe(true);
		});
		it("includes no other blocks", () => {
			expect(front.length).toBe(4);
		});
	});

	describe("when moving left", () => {
		const front = block.getFront(Vector.left);
		it("includes the top block", () => {
			expect(contains(front, Vector.up)).toBe(true);
		});
		it("includes the bottom block", () => {
			expect(contains(front, Vector.down)).toBe(true);
		});
		it("includes the left block", () => {
			expect(contains(front, Vector.left)).toBe(true);
		});
		it("includes the outlier block", () => {
			expect(contains(front, outlier)).toBe(true);
		});
		it("includes no other blocks", () => {
			expect(front.length).toBe(4);
		});
	});

	describe("when moving right", () => {
		const front = block.getFront(Vector.right);
		it("includes the top block", () => {
			expect(contains(front, Vector.up)).toBe(true);
		});
		it("includes the bottom block", () => {
			expect(contains(front, Vector.down)).toBe(true);
		});
		it("includes the right block", () => {
			expect(contains(front, Vector.right)).toBe(true);
		});
		it("includes the outlier block", () => {
			expect(contains(front, outlier)).toBe(true);
		});
		it("includes no other blocks", () => {
			expect(front.length).toBe(4);
		});
	});
});
