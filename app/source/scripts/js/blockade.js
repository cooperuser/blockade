/**
 * Created by Cooper Anderson on 8/24/16 AD.
 */

/*
 data.grid = {
 0: {
 0: {
 tile: new StandardTile(new Vector2(0, 0))
 },
 1: {
 tile: new StandardTile(new Vector2(0, 1))
 },
 2: {
 tile: new StandardTile(new Vector2(0, 2)),
 block: new StandardBlock(new Vector2(0, 2))
 }
 },
 1: {
 0: {
 tile: new StandardTile(new Vector2(1, 0))
 },
 1: {
 tile: new StandardTile(new Vector2(1, 1)),
 plate: new StandardPlate(new Vector2(1, 1))
 },
 2: {
 tile: new StandardTile(new Vector2(1, 2))
 }
 },
 2: {
 0: {
 tile: new StandardTile(new Vector2(2, 0))
 },
 1: {
 tile: new StandardTile(new Vector2(2, 1))
 },
 2: {
 tile: new StandardTile(new Vector2(2, 2))
 }
 }
 }
 */


const {Vector2} = require("Vectors");
const {Tile, StandardTile} = require("Tiles");
const {Plate, StandardPlate} = require("Plates");
const {Block, StandardBlock} = require("Blocks");

var tile = new Tile(new Vector2(1, 1));
var plate = new Plate(new Vector2(1, 1));
var block = new StandardBlock(new Vector2(1, 1));

var data;

function init(_data = `{"grid":{"0":{"0":{"tile":{"position":{"x":0,"y":0},"color":"white","passable":true,"class":"StandardTile","objectType":"Tile"}},"1":{"tile":{"position":{"x":0,"y":1},"color":"white","passable":true,"class":"StandardTile","objectType":"Tile"}},"2":{"tile":{"position":{"x":0,"y":2},"color":"white","passable":true,"class":"StandardTile","objectType":"Tile"},"block":{"position":{"x":0,"y":2},"color":"white","passable":false,"velocity":{"x":0,"y":0},"moveable":true,"class":"StandardBlock","objectType":"Block"}}},"1":{"0":{"tile":{"position":{"x":1,"y":0},"color":"white","passable":true,"class":"StandardTile","objectType":"Tile"}},"1":{"tile":{"position":{"x":1,"y":1},"color":"white","passable":true,"class":"StandardTile","objectType":"Tile"},"plate":{"position":{"x":1,"y":1},"color":"white","passable":true,"active":false,"class":"StandardPlate","objectType":"Plate"}},"2":{"tile":{"position":{"x":1,"y":2},"color":"white","passable":true,"class":"StandardTile","objectType":"Tile"}}},"2":{"0":{"tile":{"position":{"x":2,"y":0},"color":"white","passable":true,"class":"StandardTile","objectType":"Tile"}},"1":{"tile":{"position":{"x":2,"y":1},"color":"white","passable":true,"class":"StandardTile","objectType":"Tile"}},"2":{"tile":{"position":{"x":2,"y":2},"color":"white","passable":true,"class":"StandardTile","objectType":"Tile"}}}},"name":"Debug","creators":["Cooper Anderson"],"par":0,"flags":[],"size":{"x":3,"y":3}}`) {
	data = JSON.parse(_data);
	data.size = new Vector2();
	for (var i in data.grid) {
		data.size.x++;
	}
	for (var j in data.grid[0]) {
		data.size.y++;
	}
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
			char = ""
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

function temp() {
	pos = {x: 0, y: 2}
	dir = {x: 1, y: 0}
	dest = {x: 1, y: 2}
	grid = data.grid;
	isPassable = function(gridSpace) {
		var passable = [];
		for (key in gridSpace) {
			passable.push(gridSpace[key].passable);
		}
		return !passable.includes(false);
	};
	printGrid();
	data.grid[0][2].block.velocity.x = 1;
	data.grid = eval(data.grid[0][2].block.class).Move(data.grid[0][2].block, data.grid)
	printGrid();
}
