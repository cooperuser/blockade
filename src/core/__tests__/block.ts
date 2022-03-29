import { Block, BlockType, type Shape } from "../block";
import { Vector } from "../vector";

class Standard extends BlockType {}
const [typeA, typeB] = [new Standard(), new Standard()];
const contains = (f: Shape, v: Vector) => f.some(p => p[0].equals(v));

describe("Block", () => {
	it("should be defined", () => {
		expect(Block).toBeDefined();
	});

	it("gets created at (0, 0)", () => {
		const block = new Block(new Vector(1, 2), typeA);
		expect(block.shape.length).toBe(1);

		const pair = block.shape[0];
		expect(pair[0]).toEqual(new Vector(0, 0));
		expect(pair[1]).toEqual(typeA);
	});

	it("can have blocks appended", () => {
		const block = new Block(new Vector(1, 1), typeA);
		const sizeAfterB = block.addBlock(new Vector(1, 2), typeA);
		expect(sizeAfterB).toBe(2);
		expect(block.shape[1][0]).toEqual(new Vector(0, 1));
		expect(block.shape[1][1]).toEqual(typeA);

		const sizeAfterB2 = block.addBlock(new Vector(1, 2), typeA);
		expect(block.shape.length).toBe(2);
		expect(sizeAfterB2).toBe(-1);
		expect(block.shape[1][0]).toEqual(new Vector(0, 1));
		expect(block.shape[1][1]).toEqual(typeA);

		const sizeAfterC = block.addBlock(new Vector(2, 1), typeA);
		expect(block.shape.length).toBe(3);
		expect(sizeAfterC).toBe(3);
		expect(block.shape[2][0]).toEqual(new Vector(1, 0));
		expect(block.shape[2][1]).toEqual(typeA);
	});
});

describe("get front-facing blocks", () => {
	const block = new Block(new Vector(0, 0), typeA);
	const outlier = new Vector(2, 2);
	block.addBlock(Vector.up, typeA);
	block.addBlock(Vector.down, typeA);
	block.addBlock(Vector.left, typeA);
	block.addBlock(Vector.right, typeA);
	block.addBlock(outlier, typeA);

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

describe("get front-facing blocks with types", () => {
	const block = new Block(new Vector(0, 0), typeA);
	const topright = Vector.add(Vector.up, Vector.right);
	block.addBlock(Vector.up, typeB);
	block.addBlock(Vector.right, typeB);
	block.addBlock(topright, typeB);

	describe("when moving up", () => {
		const front = block.getFront(Vector.up);
		it("includes the top two blocks", () => {
			expect(contains(front, Vector.up)).toBe(true);
			expect(contains(front, topright)).toBe(true);
		});
		it("includes the bottom left block", () => {
			expect(contains(front, Vector.up)).toBe(true);
		});
		it("includes no other blocks", () => {
			expect(front.length).toBe(3);
		});
	});

	describe("when moving down", () => {
		const front = block.getFront(Vector.down);
		it("includes the bottom two blocks", () => {
			expect(contains(front, Vector.zero)).toBe(true);
			expect(contains(front, Vector.right)).toBe(true);
		});
		it("includes the top left block", () => {
			expect(contains(front, Vector.up)).toBe(true);
		});
		it("includes no other blocks", () => {
			expect(front.length).toBe(3);
		});
	});

	describe("when moving left", () => {
		const front = block.getFront(Vector.left);
		it("includes the left two blocks", () => {
			expect(contains(front, Vector.zero)).toBe(true);
			expect(contains(front, Vector.up)).toBe(true);
		});
		it("includes the bottom right block", () => {
			expect(contains(front, Vector.right)).toBe(true);
		});
		it("includes no other blocks", () => {
			expect(front.length).toBe(3);
		});
	});

	describe("when moving right", () => {
		const front = block.getFront(Vector.right);
		it("includes the right two blocks", () => {
			expect(contains(front, Vector.right)).toBe(true);
			expect(contains(front, topright)).toBe(true);
		});
		it("includes the bottom left block", () => {
			expect(contains(front, Vector.zero)).toBe(true);
		});
		it("includes no other blocks", () => {
			expect(front.length).toBe(3);
		});
	});
});
