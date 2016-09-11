/**
 * Created by Cooper Anderson on 9/9/16 AD.
 */

class Tile {
	constructor(position=new Vector2(), color="white") {
		this.position = position;
		this.color = color;
		this.passable = true;
		this.class = this.constructor.name;
		this.objectType = "Tile";
	}
}
Tile.Board = function(grid, position=new Vector2()) {
	console.log("Board (" + position.x + ", " + position.y + ')');
};
Tile.Slide = function(grid, position=new Vector2()) {
	console.log("Slide (" + position.x + ", " + position.y + ')');
};
Tile.Depart = function(grid, position=new Vector2()) {
	console.log("Depart (" + position.x + ", " + position.y + ')');
};

class StandardTile extends Tile {
	constructor(position=new Vector2(), color="white") {
		super(position, color);
	}
}

module.exports = {Tile, StandardTile};