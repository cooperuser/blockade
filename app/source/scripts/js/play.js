/**
 * Created by Cooper Anderson on 9/27/16 AD.
 */

const fs = require("fs");
const {Vector2} = require(`${__dirname}/js/Vectors`);
const Tile = require(`${__dirname}/js/init/Tiles`);
const Plate = require(`${__dirname}/js/init/Plates`);
const Block = require(`${__dirname}/js/init/Blocks`);

var file, data = {}, hasWon = false, backpage, moves = 0, distance = 0, newDistance = 0;

function render() {
	$("#game").css({width: `${data.size.x * 50 + 750}px`, height: `${data.size.y * 50 + 550}px`})
	window.scrollTo(data.size.x * 25 - 25, data.size.y * 25 - 25);
	for (var x in data.grid) {
		for (var y in data.grid[x]) {
			for (var object in data.grid[x][y]) {
				data.grid[x][y][object].GetVisuals();
			}
		}
	}
}

function init(path="source/default-levels/level0.json", back="levelselect.html?page=1") {
	var filePath = `${__dirname}/../../${path}`
	if (fs.existsSync(filePath)) {
		backpage = back;
		file = fs.readFileSync(filePath, "utf8");
		data = JSON.parse(file);
		$("#levelName").html(data.info.name);
		$("#levelNumber").html(data.info.number);
		var min = Vector2.FromList(data.board.Tiles[0].position), max = Vector2.FromList(data.board.Tiles[0].position);
		for (var object in data.board) {
			data.board[object].forEach(function(ob, index) {
				if (ob.position[0] < min.x) {
					min.x = ob.position[0];
				}
				if (ob.position[1] < min.y) {
					min.y = ob.position[1];
				}
				if (ob.position[0] > max.x) {
					max.x = ob.position[0];
				}
				if (ob.position[1] > max.y) {
					max.y = ob.position[1];
				}
			});
		}
		data.size = Vector2.Add(Vector2.Sub(max, min), new Vector2(1, 1));
		data.grid = [];
		for (var x = 0; x < data.size.x; x++) {
			data.grid.push([]);
			for (var y = 0; y < data.size.y; y++) {
				data.grid[x].push({});
			}
		}
		for (var object in data.board) {
			data.board[object].forEach(function(tile, index) {
				data.board[object][index].position[0] -= min.x;
				data.board[object][index].position[1] -= min.y;
			});
		}
		data.board.Tiles.forEach(function(tile, index) {
			data.grid[tile.position[0]][tile.position[1]].tile = new Tile[tile.class]($.extend(tile.attributes, {position: Vector2.FromList(tile.position), id: index}));
		});
		data.board.Plates.forEach(function(plate, index) {
			data.grid[plate.position[0]][plate.position[1]].plate = new Plate[plate.class]($.extend(plate.attributes, {position: Vector2.FromList(plate.position), id: index}));
		});
		data.board.Blocks.forEach(function(block, index) {
			data.grid[block.position[0]][block.position[1]].block = new Block[block.class]($.extend(block.attributes, {position: Vector2.FromList(block.position), id: index}));
		});
	} else {
		init();
		return;
	}
	render();
}

function updateInfo() {
	$("#moves").html(moves);
	$({distance: distance}).animate({distance: newDistance}, {
		duration: 400,
		step: function() {
			$("#distance").html(Math.round(this.distance));
		},
		complete: function() {
			distance = newDistance;
		}
	});
}

function checkWin() {
	var actives = [];
	for (var x in data.grid) {
		for (var y in data.grid[x]) {
			if (typeof data.grid[x][y].plate != "undefined") {
				actives.push(data.grid[x][y].plate.active);
			}
		}
	}
	if (!actives.includes(false)) {
		hasWon = true;
		setTimeout(function () {
			$("#winModal").modal("toggle")
		}, 200);
	}
}

var selected;

$("#game").on("mousemove", ".Object", function(event) {
	var objectData = $(this).data();
	var subclass = eval(objectData.class)[objectData.subclass];
	var flags = subclass.flags;
	if (flags.includes("selectable") && !$(this).hasClass("moving") && !hasWon) {
		$(".selector").remove();
		selected = data.grid[objectData.position.x][objectData.position.y].block;
		var checkMoves = data.grid[objectData.position.x][objectData.position.y].block.CheckMove(data.grid);
		$("#game").append(`
			<div class="selector" data-id='{"position": ${JSON.stringify(objectData.position)}}' style="left: ${objectData.position.x * 50}px; top: ${objectData.position.y * 50}px;">
				<a class="btn btn-${(checkMoves.up)?"success":"default"} button up" data-id='up' ${(checkMoves.up)?"":"disabled"}></a>
				<a class="btn btn-${(checkMoves.left)?"success":"default"} button left" data-id='left' ${(checkMoves.left)?"":"disabled"}></a>
				<a class="btn btn-${(checkMoves.right)?"success":"default"} button right" data-id='right' ${(checkMoves.right)?"":"disabled"}></a>
				<a class="btn btn-${(checkMoves.down)?"success":"default"} button down" data-id='down' ${(checkMoves.down)?"":"disabled"}></a>
			</div>`)
	}
});

$("#game").on("mouseleave", ".Object", function(event) {
	var objectData = $(this).data();
	var subclass = eval(objectData.class)[objectData.subclass];
	var flags = subclass.flags;
	if (flags.includes("selectable")) {
		//selected = undefined;
	}
});

$("#game").on("click", ".selector>.button", function(event) {
	var info = $(this).parent().data("id");
	var block = data.grid[info.position.x][info.position.y].block
	if (!hasWon) {
		block.velocity = Vector2.FromDirection($(this).data("id"));
		block.Move();
		$(".selector").remove();
		updateInfo();
		checkWin();
	}
});

$("#game").on("mouseleave", ".selector", function(event) {
	$(".selector").remove();
});

$("#restart").on("click", function() {
	location.reload();
});

$("#exit").on("click", function() {
	window.location = backpage;
});

setInterval(function() {
	if (selected == undefined) {
		return;
	}
	if (selected != undefined) {

	}
	if (!infoOpen) {
		$("#info").css({right: `${54 - $("#info").width()}px`});
	}
})