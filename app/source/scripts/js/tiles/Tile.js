/**
 * Created by Cooper Anderson on 9/9/16 AD.
 */

const {Vector2} = require(`${__dirname}/../Vectors`);

class Tile {
	constructor(attributes={}) {
		var _attributes = {position: new Vector2(), color: -1, passable: true}
		attributes = $.extend(_attributes, attributes);
		for (var key in attributes) {
			eval(`this.${key} = attributes[key];`);
		}
	}
	GetVisuals() {
		$("#game>#tiles").append(`<span class="tile Standard Object" id="Tile.Standard-${Vector2.ToString(this.position)}" style="left: ${100 + this.position.x*50}px; top: ${100 + this.position.y*50}px">
				<div class="color${this.color}" style="-webkit-mask-image: url(${"../resources/textures/tiles/Standard/tile.svg"});"></div>
			</span>`);
	}
	Arrive(grid) {
		console.log(`Arrive ${Vector2.ToString(this.position)}`);
	}
	Slide(grid) {
		console.log(`Slide ${Vector2.ToString(this.position)}`);
	};
	Depart(grid) {
		console.log(`Depart ${Vector2.ToString(this.position)}`);
	};
}

module.exports = {Tile};