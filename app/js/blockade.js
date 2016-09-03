/*** Created by Cooper Anderson on 8/24/16 AD. ***/

const uneval = require("uneval");

class Vector {
	constructor(x=0, y=0) {
		this.x = x;
		this.y = y;
	}
}

class Object2 {
	constructor(position=new Vector(), passable=false) {
		this.position = position;
		this.passable = passable
	}
}

class Tile extends Object2 {
	constructor(position=new Vector()) {
		super(position, true);
	}
	SlideOver(block) {

	}
}

class Plate extends Object2 {
	constructor(position=new Vector()) {
		super(position, true);
	}
}

class Block extends Object2 {
	constructor(position=new Vector()) {
		super(position, false);
		this.velocity = new Vector();
		this.moveable = true;
	}
	Move() {
		var space = new Vector(this.position.x + this.velocity.x, this.position.y + this.velocity.y);
		while (typeof grid[space.x] == "object" && typeof grid[space.x][space.y] == "object" && typeof grid[space.x][space.y].tile == "object") {
			grid[this.position.x][this.position.y].tile.SlideOver(this);
		}
	}
}

var tile = new Tile(new Vector(1, 1));
var plate = new Plate(new Vector(1, 1));
var block = new Block(new Vector(1, 1));



/*
$("#game").on("click", ".directional-button", function() {
	if (!$(this).attr("disabled")) {
		move();
		id = $(this).data("id");
		direction = $(this).attr("id");
		directions = {"up": [0, -1], "down": [0, 1], "left": [-1, 0], "right": [1, 0]};
		dir = {x: directions[direction][0], y: directions[direction][1]};
		block = {x: leveldata.blocks[id][0], y: leveldata.blocks[id][1]};
		count = 0;
		while (grid[block.x + dir.x] instanceof Array && grid[block.x + dir.x][block.y + dir.y] instanceof Array && grid[block.x + dir.x][block.y + dir.y].includes("tile") && (!grid[block.x + dir.x][block.y + dir.y].includes("block"))) {
			for(var i = 0; i < grid[block.x][block.y].length; i++) {
				if(grid[block.x][block.y][i] == "block") {
					grid[block.x][block.y].splice(i, 1);
				}
			}
			block.x += dir.x; block.y += dir.y;
			leveldata.blocks[id] = [block.x, block.y];
			grid[block.x][block.y].push("block");
		}
		$("span:last-child", $(".block-group")).remove();
		$(`.block-group#block-${id}`).animate({left: `${block.x * 50}px`, top: `${block.y * 50}px`}, 400, "swing", checkForWin);
	}
});
*/


function init(_data = '{"grid":{"0":{"0":{},"1":{},"2":{}},"1":{"0":{},"1":{"block":{"position":{"x":1,"y":2},"passable":false,"velocity":{"x":0,"y":0},"moveable":true},"plate":{"position":{"x":1,"y":2},"passable":true},"tile":{"position":{"x":1,"y":2},"passable":true}},"2":{}},"2":{"0":{},"1":{},"2":{}}},"creator":"Cooper Anderson","par":0}') {
	data = JSON.parse(_data);
	grid = data.grid;

	grid[2][1].tile = tile;
	block.velocity.x = 1;
}