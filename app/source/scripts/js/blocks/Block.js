/**
 * Created by Cooper Anderson on 9/9/16 AD.
 */

const {Vector2} = require(`${__dirname}/../Vectors`);

class Block {
	constructor(attributes={}) {
		var _attributes = {position: new Vector2(), color: 0, passable: false, moveable: true, velocity: new Vector2()}
		attributes = $.extend(_attributes, attributes);
		for (var key in attributes) {
			eval(`this.${key} = attributes[key];`);
		}
	}
	static CheckMove(block, grid) {

	}
	Move(grid) {
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
		if (!(dir.x == 0 && dir.y == 0) && typeof grid[dest.x] != "undefined" && typeof grid[dest.x][dest.y] != "undefined" && isPassable(grid[dest.x][dest.y]) && typeof grid[dest.x][dest.y].tile != "undefined" && this.moveable) {
			grid[pos.x][pos.y].tile.Depart(grid);
		}
		while (true) {
			if (!(dir.x == 0 && dir.y == 0) && typeof grid[dest.x] != "undefined" && typeof grid[dest.x][dest.y] != "undefined" && isPassable(grid[dest.x][dest.y]) && typeof grid[dest.x][dest.y].tile != "undefined" && this.moveable) {
				grid[dest.x][dest.y].tile.Slide(grid);
				delete grid[pos.x][pos.y].block;
				grid[dest.x][dest.y].block = this;
			} else {
				grid[pos.x][pos.y].tile.Arrive(grid);
				break;
			}
			pos = dest;
			this.position = pos;
			dest = new Vector2(pos.x + dir.x, pos.y + dir.y);
		}
		return grid;
	}
	GetVisuals(grid) {
		$("#game>#blocks").append(`<span class="block Standard Object" id="Block.Standard-${Vector2.ToString(this.position)}" style="left: ${100 + this.position.x*50}px; top: ${100 + this.position.y*50}px;">
				<div class="block-center color${this.color}" style="-webkit-mask-image: url(${"../resources/textures/blocks/Standard/center.svg"});"></div>
				<div class="block-corner-topLeft color${this.color}" style="-webkit-mask-image: url(${"../resources/textures/blocks/Standard/outer.svg"});"></div>
				<div class="block-corner-topRight color${this.color}" style="-webkit-mask-image: url(${"../resources/textures/blocks/Standard/outer.svg"});"></div>
				<div class="block-corner-bottomLeft color${this.color}" style="-webkit-mask-image: url(${"../resources/textures/blocks/Standard/outer.svg"});"></div>
				<div class="block-corner-bottomRight color${this.color}" style="-webkit-mask-image: url(${"../resources/textures/blocks/Standard/outer.svg"});"></div>
			</span>`);
	}
}

module.exports = {Block};