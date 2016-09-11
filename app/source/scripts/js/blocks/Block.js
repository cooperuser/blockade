/**
 * Created by Cooper Anderson on 9/9/16 AD.
 */

class Block {
	constructor(position=new Vector2(), color="white") {
		this.position = position;
		this.color = color;
		this.passable = false;
		this.velocity = new Vector2();
		this.moveable = true;
		this.class = this.constructor.name;
		this.objectType = "Block";
	}
}
Block.CheckMove = function(block, grid) {

};
Block.Move = function (block, grid) {
	var isPassable = function(gridSpace) {
		var passable = [];
		for (var key in gridSpace) {
			passable.push(gridSpace[key].passable);
		}
		return !passable.includes(false);
	};
	var pos = block.position;
	var dir = block.velocity;
	var dest = new Vector2(pos.x + dir.x, pos.y + dir.y);
	if (!(dir.x == 0 && dir.y == 0) && typeof grid[dest.x] != "undefined" && typeof grid[dest.x][dest.y] != "undefined" && isPassable(grid[dest.x][dest.y]) && typeof grid[dest.x][dest.y].tile != "undefined") {
		eval(eval(`grid[dest.x][dest.y].tile.class`)).Depart(grid, dest);
	}
	while (true) {
		if (!(dir.x == 0 && dir.y == 0) && typeof grid[dest.x] != "undefined" && typeof grid[dest.x][dest.y] != "undefined" && isPassable(grid[dest.x][dest.y]) && typeof grid[dest.x][dest.y].tile != "undefined") {
			eval(eval(`grid[dest.x][dest.y].tile.class`)).Slide(grid, dest);
			eval(`delete grid[pos.x][pos.y].${block.objectType.toLowerCase()}`);
			eval(`grid[dest.x][dest.y].${block.objectType.toLowerCase()} = block`);
		} else {
			eval(eval(`grid[pos.x][pos.y].tile.class`)).Board(grid, pos);
			break;
		}
		pos = dest;
		dest = new Vector2(pos.x + dir.x, pos.y + dir.y);
	}
	return grid;
};

class StandardBlock extends Block {
	constructor(position=new Vector2(), color="white") {
		super(position, color);
	}
}

class HollowBlock extends Block {
	constructor(position=new Vector2()) {
		super(position);
		this.class = this.constructor.name;
	}
}

module.exports = {Block, StandardBlock, HollowBlock};