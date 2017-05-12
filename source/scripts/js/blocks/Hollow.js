/**
 * Created by Cooper Anderson on 9/12/16 AD.
 */

const {Block} = require(`${__dirname}/Block`);
const {Vector2} = require(`${__dirname}/../Vectors`);

class Hollow extends Block {
	constructor(attributes = {}) {
		super($.extend(attributes, {color: -1, pressable: false}));
	}
	GetVisuals(grid) {
		$("#game>#blocks").append(`<span class="block Hollow Object" id="Block-Hollow-${this.id}" style="left: ${this.position.x * 50}px; top: ${this.position.y * 50}px;">
			<div class="block-center color${this.color}" style="-webkit-mask-image: url(${"../resources/textures/blocks/Hollow/center.svg"});"></div>
			<div class="block-corner-topLeft color${this.color}" style="-webkit-mask-image: url(${"../resources/textures/blocks/Hollow/outer.svg"});"></div>
			<div class="block-corner-topRight color${this.color}" style="-webkit-mask-image: url(${"../resources/textures/blocks/Hollow/outer.svg"});"></div>
			<div class="block-corner-bottomLeft color${this.color}" style="-webkit-mask-image: url(${"../resources/textures/blocks/Hollow/outer.svg"});"></div>
			<div class="block-corner-bottomRight color${this.color}" style="-webkit-mask-image: url(${"../resources/textures/blocks/Hollow/outer.svg"});"></div>
		</span>`);
		$(`#Block-Hollow-${this.id}`).data({position: this.position, class:"Block", subclass:"Hollow", id: this.id});
	}
	Animate(movement) {
		$(`#Block-Hollow-${this.id}`).addClass("moving");
		$(`#Block-Hollow-${this.id}`).animate({left: `${movement[0][1].x * 50}px`, top: `${movement[0][1].y * 50}px`}, 400, function() {$(this).removeClass("moving");});
		//console.log({position: movement[0][1]});
		$(`#Block-Hollow-${this.id}`).data({position: movement[0][1]});
		//$(`#Block-Standard-${Vector2.ToString(movement[0][0])}`).attr("id", `#Block-Standard-${Vector2.ToString(movement[0][1])}`)
	}
}

module.exports = {Hollow};