/**
 * Created by Cooper Anderson on 9/9/16 AD.
 */

const {Vector2} = require(`${__dirname}/../Vectors`);

class Block {
	constructor(attributes = {}) {
		attributes = $.extend({
			position: new Vector2(),
			color: 0,
			passable: false,
			moveable: true,
			pressable: true,
			velocity: new Vector2(),
			id: -1,
			superclass: "Block",
			subclass: "Standard"
		}, attributes);
		for (var key in attributes) {
			this[key] = attributes[key];
		}
	}
	CheckMove(grid) {
		var isPassable = function(gridSpace) {
			var passable = [];
			for (var key in gridSpace) {
				passable.push(gridSpace[key].passable);
			}
			return !passable.includes(false);
		};
		var result = {up: false, down: false, left: false, right: false};
		var dest = Vector2.Add(this.position, new Vector2(0, -1));
		if (typeof grid[dest.x] != "undefined" && typeof grid[dest.x][dest.y] != "undefined" && isPassable(grid[dest.x][dest.y]) && typeof grid[dest.x][dest.y].tile != "undefined" && this.moveable) {
			result.up = true;
		}
		dest = Vector2.Add(this.position, new Vector2(0, 1));
		if (typeof grid[dest.x] != "undefined" && typeof grid[dest.x][dest.y] != "undefined" && isPassable(grid[dest.x][dest.y]) && typeof grid[dest.x][dest.y].tile != "undefined" && this.moveable) {
			result.down = true;
		}
		dest = Vector2.Add(this.position, new Vector2(-1, 0));
		if (typeof grid[dest.x] != "undefined" && typeof grid[dest.x][dest.y] != "undefined" && isPassable(grid[dest.x][dest.y]) && typeof grid[dest.x][dest.y].tile != "undefined" && this.moveable) {
			result.left = true;
		}
		dest = Vector2.Add(this.position, new Vector2(1, 0));
		if (typeof grid[dest.x] != "undefined" && typeof grid[dest.x][dest.y] != "undefined" && isPassable(grid[dest.x][dest.y]) && typeof grid[dest.x][dest.y].tile != "undefined" && this.moveable) {
			result.right = true;
		}
		return result;
	}
	Move() {
		var grid = data.grid;
		var isPassable = function(gridSpace) {
			var passable = [];
			for (var key in gridSpace) {
				passable.push(gridSpace[key].passable);
			}
			return !passable.includes(false);
		};
		var pos = this.position;
		var dir = this.velocity;
		var dest = new Vector2(pos.x + dir.x, pos.y + dir.y);
		var movement = [[pos]];
		if (!(dir.x == 0 && dir.y == 0) && typeof grid[dest.x] != "undefined" && typeof grid[dest.x][dest.y] != "undefined" && isPassable(grid[dest.x][dest.y]) && typeof grid[dest.x][dest.y].tile != "undefined" && this.moveable) {
			grid[pos.x][pos.y].tile.Depart(grid, this);
		}
		while (true) {
			if (!(dir.x == 0 && dir.y == 0) && typeof grid[dest.x] != "undefined" && typeof grid[dest.x][dest.y] != "undefined" && isPassable(grid[dest.x][dest.y]) && typeof grid[dest.x][dest.y].tile != "undefined" && this.moveable) {
				grid[dest.x][dest.y].tile.Slide(grid, this);
				delete grid[pos.x][pos.y].block;
				grid[dest.x][dest.y].block = this;
			} else {
				grid[pos.x][pos.y].tile.Arrive(grid, this);
				break;
			}
			pos = dest;
			this.position = pos;
			dest = new Vector2(pos.x + dir.x, pos.y + dir.y);
		}
		movement[0][1] = pos;
		this.Animate(movement);
		data.grid = grid;
	}
	Animate(movement) {
		$(`#Block-Standard-${this.id}`).addClass("moving");
		$(`#Block-Standard-${this.id}`).animate({left: `${movement[0][1].x * 50}px`, top: `${movement[0][1].y * 50}px`}, {duration: 400, complete: function() {$(this).removeClass("moving");}});
		//console.log({position: movement[0][1]});
		$(`#Block-Standard-${this.id}`).data({position: movement[0][1]});
		//$(`#Block-Standard-${Vector2.ToString(movement[0][0])}`).attr("id", `#Block-Standard-${Vector2.ToString(movement[0][1])}`)
	}
	GetVisuals(grid) {
		$("#game>#blocks").append(`<span class="block Standard Object" id="Block-Standard-${this.id}" style="left: ${this.position.x * 50}px; top: ${this.position.y * 50}px;">
			<div class="block-center color${this.color}" style="-webkit-mask-image: url(${"../resources/textures/blocks/Standard/center.svg"});"></div>
			<div class="block-corner-topLeft color${this.color}" style="-webkit-mask-image: url(${"../resources/textures/blocks/Standard/outer.svg"});"></div>
			<div class="block-corner-topRight color${this.color}" style="-webkit-mask-image: url(${"../resources/textures/blocks/Standard/outer.svg"});"></div>
			<div class="block-corner-bottomLeft color${this.color}" style="-webkit-mask-image: url(${"../resources/textures/blocks/Standard/outer.svg"});"></div>
			<div class="block-corner-bottomRight color${this.color}" style="-webkit-mask-image: url(${"../resources/textures/blocks/Standard/outer.svg"});"></div>
		</span>`);
		$(`#Block-Standard-${this.id}`).data({position: this.position, class: "Block", subclass: "Standard", id: this.id});
	}
}
Block.flags = ["selectable"];

module.exports = {Block};