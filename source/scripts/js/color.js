/**
 * Created by cooperanderson on 12/7/16 AD.
 */

function componentToHex(c) {
	var hex = c.toString(16);
	return hex.length == 1 ? "0" + hex : hex;
}

function clamp(value, min, max) {
	if (value < min) {
		return min;
	} else if (value > max) {
		return max;
	}
	return value;
}

function getRandomKey(obj) {
	var result;
	var count = 0;
	for (var prop in obj)
		if (Math.random() < 1/++count)
			result = prop;
	return result;
}

/**
 * The Color class
 */
class Color {
	constructor(attr={}, g=0, b=0, a=1, type="rgb") {
		this.data = {red: 0, green: 0, blue: 0, hue: 0, saturation: 0, lightness: 0, hex: 0, alpha: 1};
		if (typeof attr == "object") {
			if (typeof attr.hex != "undefined") {
				this.hex = attr.hex;
			} else if (typeof attr.h != "undefined" || typeof attr.s != "undefined" || typeof attr.l != "undefined") {
				this.hsl = {h: (attr.h == undefined) ? 0 : attr.h, s: (attr.s == undefined) ? 0 : attr.s, l: (attr.l == undefined) ? 0 : attr.l};
			} else if (typeof attr.r != "undefined" || typeof attr.g != "undefined" || typeof attr.b != "undefined") {
				this.rgb = {r: (attr.r == undefined) ? 0 : attr.r, g: (attr.g == undefined) ? 0 : attr.g, b: (attr.b == undefined) ? 0 : attr.b};
			} else {
				this.rgb = {r: 0, g: 0, b: 0};
			}
		} else if (typeof attr == "string") {
			this.hex = attr;
		} else if (typeof attr == "number") {
			if (type == "rgb") {
				this.rgb = {r: attr, g: g, b: b};
			} else if (type == "hsl") {
				this.rgb = {h: attr, s: g, l: b};
			}
		}
	}

	static parse(color) {
		if (Array.isArray(color)) {
			return new Color(color[0], color[1], color[2], color[3]);
		} else if (color[0] == '#') {
			return new Color(color);
		} else if (color[0] == 'r' && color[1] == 'g' && color[2] == 'b') {
			color = color.split("(")[1].split(")")[0].replace(/\s/g, '').split(",");
			return new Color({r: color[0], g: color[1], b: color[2]});
		} else if (color[0] == 'h' && color[1] == 's' && color[2] == 'l') {
			color = color.split("(")[1].split(")")[0].replace(/\s/g, '').split(",");
			return new Color({h: color[0], s: color[1], l: color[2]});
		} else {
			return new Color();
		}
	}

	setRed(value) {
		this.red = value;
		return this;
	}

	setGreen(value) {
		this.green = value;
		return this;
	}

	setBlue(value) {
		this.blue = value;
		return this;
	}

	setAlpha(value) {
		this.alpha = value;
		return this;
	}

	setHue(value) {
		this.hue = value;
		return this;
	}

	setSaturation(value) {
		this.saturation = value;
		return this;
	}

	setLightness(value) {
		this.lightness = value;
		return this;
	}

	print(text) {
		console.log(`%c${text}`, `color: ${this.cssRGB()};`);
		console.log(`%c${text}`, `color: ${this.cssHSL()};`);
		console.log(`%c${text}`, `color: ${this.cssHEX()};`);
	}

	lerp(color, percent) {
		return new Color({
			r: (color.r - this.r) * percent + this.r,
			g: (color.g - this.g) * percent + this.g,
			b: (color.b - this.b) * percent + this.b
		});
	}

	static lerp(colors=[new Color()], percent) {
		let clamp = function(value) {
			if (value < 0) {
				return 0;
			} else if (value > 255) {
				return 255;
			} else {
				return value;
			}
		}
		if (colors.length > 1) {
			if (percent < 0) {
				return new Color({
					r: clamp((colors[1].r - colors[0].r) * percent + colors[0].r),
					g: clamp((colors[1].g - colors[0].g) * percent + colors[0].g),
					b: clamp((colors[1].b - colors[0].b) * percent + colors[0].b)
				});
			} else if (percent > 1) {
				return new Color({
					r: clamp((colors[colors.length - 1].r - colors[colors.length - 2].r) * percent + colors[colors.length - 2].r),
					g: clamp((colors[colors.length - 1].g - colors[colors.length - 2].g) * percent + colors[colors.length - 2].g),
					b: clamp((colors[colors.length - 1].b - colors[colors.length - 2].b) * percent + colors[colors.length - 2].b)
				});
			}
			let intervals = colors.length - 1;
			let interval = 1 / intervals;
			for (let i = 0; i < intervals; i++) {
				if (percent >= interval * i && percent <= interval * (i + 1)) {
					let percentage = (percent - interval * i) / ((interval * (i + 1)) - (interval * i));
					return new Color({
						r: (colors[i + 1].r - colors[i].r) * percentage + colors[i].r,
						g: (colors[i + 1].g - colors[i].g) * percentage + colors[i].g,
						b: (colors[i + 1].b - colors[i].b) * percentage + colors[i].b
					});
				}
			}
		} else {
			return colors[0];
		}
	}

	static blend(colors=[]) {
		let hue = 0;
		let saturation = 0;
		let lightness = 0;
		for (let color in colors) {
			hue += colors[color].hue;
			saturation += colors[color].saturation;
			lightness += colors[color].lightness;
		}
		hue /= colors.length;
		saturation /= colors.length;
		lightness /= colors.length;
		return new Color({h: hue, s: saturation, l: lightness});
	}

	static add(colors=[]) {
		let color = new Color();
		for (let c in colors) {
			color.red = clamp(color.red + colors[c].red, 0, 255);
			color.green = clamp(color.green + colors[c].green, 0, 255);
			color.blue = clamp(color.blue + colors[c].blue, 0, 255);
			color.alpha = clamp(color.alpha + colors[c].alpha, 0, 1);
		}
		return color;
	}

	static subtract(color1, color2) {
		let red = clamp(color1.red - color2.red, 0, 255);
		let green = clamp(color1.green - color2.green, 0, 255);
		let blue = clamp(color1.blue - color2.blue, 0, 255);
		return new Color(red, green, blue);
	}

	static multiply(colors=[]) {
		let color = new Color(255, 255, 255);
		for (let c in colors) {
			color.red *= colors[c].red / 255;
			color.green *= colors[c].green / 255;
			color.blue *= colors[c].blue / 255;
			color.alpha *= colors[c].alpha;
		}
		return color;
	}

	static screen(colors=[]) {
		let color = new Color(255, 255, 255);
		let white = new Color(255, 255, 255);
		for (let c in colors) {
			color = Color.subtract(white, Color.multiply(Color.subtract(white, color), Color.subtract(white, colors[c])));
		}
		return color;
	}

	static GetRandomColor(family, index=[0, 0]) {
		return Color.colors[family][getRandomKey(Color.colors[family])][Math.random() * (index[1] - index[0]) + index[1]];
	}

	static GetBinary(color) {
		let bytes = "";
		let byte = "";
		byte = color.red.toString(2);
		bytes += '0'.repeat(8 - byte.length) + byte;
		byte = "";
		byte = color.green.toString(2);
		bytes += '0'.repeat(8 - byte.length) + byte;
		byte = "";
		byte = color.green.toString(2);
		bytes += '0'.repeat(8 - byte.length) + byte;
		return bytes;
	}

	cssRGB() {
		return `rgb(${Math.round(this.red)}, ${Math.round(this.green)}, ${Math.round(this.blue)})`;
	}

	cssRGBA() {
		return `rgba(${Math.round(this.red)}, ${Math.round(this.green)}, ${Math.round(this.blue)}, ${this.alpha})`;
	}

	cssHSL() {
		return `hsl(${Math.floor(this.hue * 360)}, ${Math.floor(this.saturation * 100)}%, ${Math.floor(this.lightness * 100)}%)`
	}

	cssHEX() {
		return this.hex;
	}

	_updateRGB(from="hsl") {
		if (from == "hsl") {
			var r, g, b, h = this.data.hue - Math.floor(this.data.hue), s = this.data.saturation, l = this.data.lightness;

			if(s == 0){
				r = g = b = l; // achromatic
			}else{
				var hue2rgb = function hue2rgb(p, q, t){
					if(t < 0) t += 1;
					if(t > 1) t -= 1;
					if(t < 1/6) return p + (q - p) * 6 * t;
					if(t < 1/2) return q;
					if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
					return p;
				}

				var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
				var p = 2 * l - q;
				r = hue2rgb(p, q, h + 1/3);
				g = hue2rgb(p, q, h);
				b = hue2rgb(p, q, h - 1/3);
			}

			this.data.red = Math.round(r * 255);
			this.data.green = Math.round(g * 255);
			this.data.blue = Math.round(b * 255);
		} else if (from == "hex") {

		}
	}

	_updateHSL(from="rgb") {
		if (from == "rgb") {
			let r = this.data.red / 255, g = this.data.green / 255, b = this.data.blue / 255;
			let max = Math.max(r, g, b), min = Math.min(r, g, b);
			let h, s, l = (max + min) / 2;

			if(max == min){
				h = s = 0; // achromatic
			}else{
				let d = max - min;
				s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
				switch(max){
					case r: h = (g - b) / d + (g < b ? 6 : 0); break;
					case g: h = (b - r) / d + 2; break;
					case b: h = (r - g) / d + 4; break;
				}
				h /= 6;
			}

			this.data.hue = h;
			this.data.saturation = s;
			this.data.lightness = l;
		} else if (from == "hex") {

		}
	}

	_updateHEX(from="rgb") {
		if (from == "rgb") {

		} else if (from == "hsl") {

		}
	}


	/**
	 * RGB Getters and Setters
	 */
	get rgb() {
		return {r: this.red, g: this.green, b: this.blue};
	}
	set rgb(value) {
		this.data.red = value.r;
		this.data.green = value.g;
		this.data.blue = value.b;
		this._updateHSL("rgb");
		this._updateHEX("rgb");
	}

	/**
	 * HSL Getters and Setters
	 */
	get hsl() {
		return {h: this.hue, s: this.saturation, l: this.lightness};
	}
	set hsl(value) {
		this.data.hue = value.h;
		this.data.saturation = value.s;
		this.data.lightness = value.l;
		this._updateRGB("hsl");
		this._updateHEX("hsl");
	}

	/**
	 * HEX Getters and Setters
	 */
	get hex() {
		return "#" + componentToHex(Math.round(this.red)) + componentToHex(Math.round(this.green)) + componentToHex(Math.round(this.blue));
	}
	set hex(value) {
		this.data.hex = value;
		this.rgb = (function() {
			var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(value);
			return result ? {
				r: parseInt(result[1], 16),
				g: parseInt(result[2], 16),
				b: parseInt(result[3], 16)
			} : null;
		})();
	}

	/**
	 * Red Getters and Setters
	 */
	get red() {
		return this.data.red;
	}
	get r() {
		return this.red;
	}
	set red(value) {
		this.data.red = value;
		this._updateHSL("rgb");
		this._updateHEX("rgb");
	}
	set r(value) {
		this.red = value;
	}

	/**
	 * Green Getters and Setters
	 */
	get green() {
		return this.data.green;
	}
	get g() {
		return this.green;
	}
	set green(value) {
		this.data.green = value;
		this._updateHSL("rgb");
		this._updateHEX("rgb");
	}
	set g(value) {
		this.green = value;
	}

	/**
	 * Blue Getters and Setters
	 */
	get blue() {
		return this.data.blue;
	}
	get b() {
		return this.blue;
	}
	set blue(value) {
		this.data.blue = value;
		this._updateHSL("rgb");
		this._updateHEX("rgb");
	}
	set b(value) {
		this.blue = value;
	}

	/**
	 * Alpha Getters and Setter
	 */
	get alpha() {
		return this.data.alpha;
	}

	get a() {
		return this.alpha;
	}

	set alpha(value) {
		this.data.alpha = value;
	}

	set a(value) {
		this.alpha = value;
	}

	/**
	 * Hue Getters and Setters
	 */
	get hue() {
		return this.data.hue;
	}
	get h() {
		return this.hue;
	}
	set hue(value) {
		this.data.hue = value;
		this._updateRGB("hsl");
		this._updateHEX("hsl");
	}
	set h(value) {
		this.hue = value;
	}

	/**
	 * Saturation Getters and Setters
	 */
	get saturation() {
		return this.data.saturation;
	}
	get s() {
		return this.saturation;
	}
	set saturation(value) {
		this.data.saturation = value;
		this._updateRGB("hsl");
		this._updateHEX("hsl");
	}
	set s(value) {
		this.saturation = value;
	}

	/**
	 * Lightness Getters and Setters
	 */
	get lightness() {
		return this.data.lightness;
	}
	get l() {
		return this.lightness;
	}
	set lightness(value) {
		this.data.lightness = value;
		this._updateRGB("hsl");
		this._updateHEX("hsl");
	}
	set l(value) {
		this.lightness = value;
	}
}

Color.colors = {
	material: {
		red: [
			new Color("#F44336"),
			new Color("#FFEBEE"),
			new Color("#FFCDD2"),
			new Color("#EF9A9A"),
			new Color("#E57373"),
			new Color("#EF5350"),
			new Color("#F44336"),
			new Color("#E53935"),
			new Color("#D32F2F"),
			new Color("#C62828"),
			new Color("#B71C1C")
		],
		pink: [
			new Color("#E91E63"),
			new Color("#FCE4EC"),
			new Color("#F8BBD0"),
			new Color("#F48FB1"),
			new Color("#F06292"),
			new Color("#EC407A"),
			new Color("#E91E63"),
			new Color("#D81B60"),
			new Color("#C2185B"),
			new Color("#AD1457"),
			new Color("#880E4F")
		],
		purple: [
			new Color("#9C27B0"),
			new Color("#F3E5F5"),
			new Color("#E1BEE7"),
			new Color("#CE93D8"),
			new Color("#BA68C8"),
			new Color("#AB47BC"),
			new Color("#9C27B0"),
			new Color("#8E24AA"),
			new Color("#7B1FA2"),
			new Color("#6A1B9A"),
			new Color("#4A148C")
		],
		deepPurple: [
			new Color("#673AB7"),
			new Color("#EDE7F6"),
			new Color("#D1C4E9"),
			new Color("#B39DDB"),
			new Color("#9575CD"),
			new Color("#7E57C2"),
			new Color("#673AB7"),
			new Color("#5E35B1"),
			new Color("#512DA8"),
			new Color("#4527A0"),
			new Color("#311B92")
		],
		indigo: [
			new Color("#3F51B5"),
			new Color("#E8EAF6"),
			new Color("#C5CAE9"),
			new Color("#9FA8DA"),
			new Color("#7986CB"),
			new Color("#5C6BC0"),
			new Color("#3F51B5"),
			new Color("#3949AB"),
			new Color("#303F9F"),
			new Color("#283593"),
			new Color("#1A237E")
		],
		blue: [
			new Color("#2196F3"),
			new Color("#E3F2FD"),
			new Color("#BBDEFB"),
			new Color("#90CAF9"),
			new Color("#64B5F6"),
			new Color("#42A5F5"),
			new Color("#2196F3"),
			new Color("#1E88E5"),
			new Color("#1976D2"),
			new Color("#1565C0"),
			new Color("#0D47A1")
		],
		lightBlue: [
			new Color("#03A9F4"),
			new Color("#E1F5FE"),
			new Color("#B3E5FC"),
			new Color("#81D4FA"),
			new Color("#4FC3F7"),
			new Color("#29B6F6"),
			new Color("#03A9F4"),
			new Color("#039BE5"),
			new Color("#0288D1"),
			new Color("#0277BD"),
			new Color("#01579B")
		],
		cyan: [
			new Color("#00BCD4"),
			new Color("#E0F7FA"),
			new Color("#B2EBF2"),
			new Color("#80DEEA"),
			new Color("#4DD0E1"),
			new Color("#26C6DA"),
			new Color("#00BCD4"),
			new Color("#00ACC1"),
			new Color("#0097A7"),
			new Color("#00838F"),
			new Color("#006064")
		],
		teal: [
			new Color("#009688"),
			new Color("#E0F2F1"),
			new Color("#B2DFDB"),
			new Color("#80CBC4"),
			new Color("#4DB6AC"),
			new Color("#26A69A"),
			new Color("#009688"),
			new Color("#00897B"),
			new Color("#00796B"),
			new Color("#00695C"),
			new Color("#004D40")
		],
		green: [
			new Color("#4CAF50"),
			new Color("#E8F5E9"),
			new Color("#C8E6C9"),
			new Color("#A5D6A7"),
			new Color("#81C784"),
			new Color("#66BB6A"),
			new Color("#4CAF50"),
			new Color("#43A047"),
			new Color("#388E3C"),
			new Color("#2E7D32"),
			new Color("#1B5E20")
		],
		lightGreen: [
			new Color("#8BC34A"),
			new Color("#F1F8E9"),
			new Color("#DCEDC8"),
			new Color("#C5E1A5"),
			new Color("#AED581"),
			new Color("#9CCC65"),
			new Color("#8BC34A"),
			new Color("#7CB342"),
			new Color("#689F38"),
			new Color("#558B2F"),
			new Color("#33691E")
		],
		lime: [
			new Color("#CDDC39"),
			new Color("#F9FBE7"),
			new Color("#F0F4C3"),
			new Color("#E6EE9C"),
			new Color("#DCE775"),
			new Color("#D4E157"),
			new Color("#CDDC39"),
			new Color("#C0CA33"),
			new Color("#AFB42B"),
			new Color("#9E9D24"),
			new Color("#827717")
		],
		yellow: [
			new Color("#FFEB3B"),
			new Color("#FFFDE7"),
			new Color("#FFF9C4"),
			new Color("#FFF59D"),
			new Color("#FFF176"),
			new Color("#FFEE58"),
			new Color("#FFEB3B"),
			new Color("#FDD835"),
			new Color("#FBC02D"),
			new Color("#F9A825"),
			new Color("#F57F17")
		],
		amber: [
			new Color("#FFC107"),
			new Color("#FFF8E1"),
			new Color("#FFECB3"),
			new Color("#FFE082"),
			new Color("#FFD54F"),
			new Color("#FFCA28"),
			new Color("#FFC107"),
			new Color("#FFB300"),
			new Color("#FFA000"),
			new Color("#FF8F00"),
			new Color("#FF6F00")
		],
		orange: [
			new Color("#FF9800"),
			new Color("#FFF3E0"),
			new Color("#FFE0B2"),
			new Color("#FFCC80"),
			new Color("#FFB74D"),
			new Color("#FFA726"),
			new Color("#FF9800"),
			new Color("#FB8C00"),
			new Color("#F57C00"),
			new Color("#EF6C00"),
			new Color("#E65100")
		],
		deepOrange: [
			new Color("#FF5722"),
			new Color("#FBE9E7"),
			new Color("#FFCCBC"),
			new Color("#FFAB91"),
			new Color("#FF8A65"),
			new Color("#FF7043"),
			new Color("#FF5722"),
			new Color("#F4511E"),
			new Color("#E64A19"),
			new Color("#D84315"),
			new Color("#BF360C")
		],
		brown: [
			new Color("#795548"),
			new Color("#EFEBE9"),
			new Color("#D7CCC8"),
			new Color("#BCAAA4"),
			new Color("#A1887F"),
			new Color("#8D6E63"),
			new Color("#795548"),
			new Color("#6D4C41"),
			new Color("#5D4037"),
			new Color("#4E342E"),
			new Color("#3E2723")
		],
		grey: [
			new Color("#9E9E9E"),
			new Color("#FAFAFA"),
			new Color("#F5F5F5"),
			new Color("#EEEEEE"),
			new Color("#E0E0E0"),
			new Color("#BDBDBD"),
			new Color("#9E9E9E"),
			new Color("#757575"),
			new Color("#616161"),
			new Color("#424242"),
			new Color("#212121")
		],
		blueGrey: [
			new Color("#607D8B"),
			new Color("#ECEFF1"),
			new Color("#CFD8DC"),
			new Color("#B0BEC5"),
			new Color("#90A4AE"),
			new Color("#78909C"),
			new Color("#607D8B"),
			new Color("#546E7A"),
			new Color("#455A64"),
			new Color("#37474F"),
			new Color("#263238")
		]
	}
}

Color.colorsRaw = {}

for (let group in Color.colors) {
	Color.colorsRaw[group] = [];
	for (let color in Color.colors[group]) {
		for (let subcolor in Color.colors[group][color]) {
			Color.colorsRaw[group].push(Color.colors[group][color][subcolor]);
		}
	}
}

module.exports = Color;