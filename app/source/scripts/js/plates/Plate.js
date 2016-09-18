/**
 * Created by Cooper Anderson on 9/9/16 AD.
 */

const {Vector2} = require(`${__dirname}/../Vectors`);

class Plate {
	constructor(attributes={}) {
		var _attributes = {position: new Vector2(), color: 0, passable: true, active: false}
		attributes = $.extend(_attributes, attributes);
		for (var key in attributes) {
			eval(`this.${key} = attributes[key];`);
		}
	}
	GetVisuals(grid) {
		$("#game>#plates").append(`<span class="plate Standard Object" id="Plate.Standard-${Vector2.ToString(this.position)}" style="left: ${100 + this.position.x*50}px; top: ${100 + this.position.y*50}px;">
				<div class="color${this.color}" style="-webkit-mask-image: url(${"../resources/textures/plates/Standard/plate.svg"});"></div>
			</span>`);
	}
}


module.exports = {Plate};