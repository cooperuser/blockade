/**
 * Created by Cooper Anderson on 8/24/16 AD.
 */

/*
 data.grid = {
 0: {
 0: {
 tile: new Tile.Standard(new Vector2(0, 0))
 },
 1: {
 tile: new Tile.Standard(new Vector2(0, 1))
 },
 2: {
 tile: new Tile.Standard(new Vector2(0, 2)),
 block: new Block.Standard(new Vector2(0, 2))
 }
 },
 1: {
 0: {
 tile: new Tile.Standard(new Vector2(1, 0))
 },
 1: {
 tile: new Tile.Standard(new Vector2(1, 1)),
 plate: new Plate.Standard(new Vector2(1, 1))
 },
 2: {
 tile: new Tile.Standard(new Vector2(1, 2))
 }
 },
 2: {
 0: {
 tile: new Tile.Standard(new Vector2(2, 0))
 },
 1: {
 tile: new Tile.Standard(new Vector2(2, 1))
 },
 2: {
 tile: new Tile.Standard(new Vector2(2, 2))
 }
 }
 }
 */


const {Vector2} = require(`${__dirname}/js/Vectors`);
const Tile = require(`${__dirname}/js/init/Tiles`);
const Plate = require(`${__dirname}/js/init/Plates`);
const Block = require(`${__dirname}/js/init/Blocks`);

var data;

function init(_data = `{"board":{"Tiles":[{"class":"Standard","position":[0,0]},{"class":"Standard","position":[0,1]},{"class":"Standard","position":[0,2]},{"class":"Standard","position":[1,0]},{"class":"Standard","position":[1,1]},{"class":"Standard","position":[1,2]},{"class":"Standard","position":[2,0]},{"class":"Standard","position":[2,1]},{"class":"Standard","position":[2,2]}],"Plates":[{"class":"Standard","position":[1,1],"attributes":{"color":0}}],"Blocks":[{"class":"Standard","position":[0,2],"attributes":{"color":0}}]},"name":"Debug","creators":["Cooper Anderson"],"par":-1,"flags":[],"size":{"x":3,"y":3}}`) {
	data = JSON.parse(_data);
	data.grid = []
	for (var x = 0; x < data.size.x; x++) {
		data.grid.push([]);
		for (var y = 0; y < data.size.y; y++) {
			data.grid[x].push({});
		}
	}
	data.board.Tiles.forEach(function(item, index) {
		var position = Vector2.FromList(item.position);
		var attributes = $.extend({position: position}, $.extend(item.attributes, {}));
		data.grid[position.x][position.y].tile = eval(`new Tile.${item.class}(${JSON.stringify(attributes)})`);
	});
	data.board.Plates.forEach(function(item, index) {
		var position = Vector2.FromList(item.position);
		var attributes = $.extend({position: position}, $.extend(item.attributes, {}));
		data.grid[position.x][position.y].plate = eval(`new Plate.${item.class}(${JSON.stringify(attributes)})`);
	});
	data.board.Blocks.forEach(function(item, index) {
		var position = Vector2.FromList(item.position);
		var attributes = $.extend({position: position}, $.extend(item.attributes, {}));
		data.grid[position.x][position.y].block = eval(`new Block.${item.class}(${JSON.stringify(attributes)})`);
	});
}

function printGrid() {
	var grid = data.grid;
	var list = []
	var final = "";
	for (var i in grid[0]) {
		list.push("");
	}
	for (var x in grid) {
		for (var y in grid[x]) {
			var char = " "
			if (typeof grid[x][y].tile != "undefined") {
				char = "t";
			}
			if (typeof grid[x][y].plate != "undefined") {
				char = "p";
			}
			if (typeof grid[x][y].block != "undefined") {
				char = "b";
			}
			list[y] += char;
		}
	}
	for (var i = 0; i < list.length; i++) {
		final += list[i] + "\n";
	}
	console.log(final);
}

//var pos, dir, dest, grid;

function temp(position=new Vector2(0, 2)) {
	printGrid();
	data.grid[position.x][position.y].block.velocity.x = 1;
	data.grid = data.grid[position.x][position.y].block.Move(data.grid)
	printGrid();
}

function render() {
	for (var x in data.grid) {
		for (var y in data.grid[x]) {
			for (var object in data.grid[x][y]) {
				data.grid[x][y][object].GetVisuals();
			}
		}
	}
}