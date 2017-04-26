/**
 * Created by Cooper Anderson on 9/9/16 AD.
 */

const {Vector2} = require(`${__dirname}/../Vectors`);

class Tile {
	constructor(attributes={}) {
		var _attributes = {position: new Vector2(), color: -1, passable: true, id: -1}
		attributes = $.extend(_attributes, attributes);
		for (var key in attributes) {
			this[key] = attributes[key];
		}
	}
	GetVisuals() {
		$("#game>#tiles").append(`<span class="tile Standard Object" id="Tile-Standard-${this.id}" style="left: ${this.position.x*50}px; top: ${this.position.y*50}px">
				<div class="color${this.color}" style="-webkit-mask-image: url(${"../resources/textures/tiles/Standard/tile.svg"});"></div>
			</span>`);
		$(`#Tile-Standard-${this.id}`).data({position: this.position, class:"Tile", subclass:"Standard", id: this.id});
	}
	Arrive(grid, block=null) {
		if (typeof grid[this.position.x][this.position.y].plate != "undefined") {
			grid[this.position.x][this.position.y].plate.Press(block);
		}
	}
	Slide(grid, block=null) {
		distance += 1;
	};
	Depart(grid, block=null) {
		moves += 1;
		if (typeof grid[this.position.x][this.position.y].plate != "undefined") {
			grid[this.position.x][this.position.y].plate.Unpress(block);
		}
	};
}
Tile.flags = [];

module.exports = {Tile};