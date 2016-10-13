/**
 * Created by Cooper Anderson on 9/9/16 AD.
 */

const {Vector2} = require(`${__dirname}/../Vectors`);

class Plate {
	constructor(attributes={}) {
		var _attributes = {position: new Vector2(), color: 0, passable: true, active: false, id: -1}
		attributes = $.extend(_attributes, attributes);
		for (var key in attributes) {
			this[key] = attributes[key];
		}
	}
	GetVisuals(grid) {
		$("#game>#plates").append(`<span class="plate Standard Object" id="Plate-Standard-${this.id}" style="left: ${this.position.x*50}px; top: ${this.position.y*50}px;">
				<div class="color${this.color}" style="-webkit-mask-image: url(${"../resources/textures/plates/Standard/plate.svg"});"></div>
			</span>`);
		$(`#Plate-Standard-${this.id}`).data({position: this.position, class:"Plate", subclass:"Standard", id: this.id});
	}
	Press(block, grid=null) {
		if ((block.color == this.color || block.color == -1 || this.color == -1) && block.pressable) {
			this.active = true;
		}
	}
	Unpress(block, grid=null) {
		if ((block.color == this.color || block.color == -1 || this.color == -1) && block.pressable) {
			this.active = false;
		}
	}
}
Plate.flags = ["showWires"];

module.exports = {Plate};