/**
 * Created by Cooper Anderson on 9/27/16 AD.
 */

const {write, directory, readJSON, retrieve} = require("./js/tools");
const {Vector2} = require("./js/Vectors");
const Tile = require("./js/init/Tiles");
const Plate = require("./js/init/Plates");
const Block = require("./js/init/Blocks");

let level = Number(location.search.split("?")[1].split("&")[0].split("=")[1]);
let data = {}, filename = readJSON(`${__dirname}/../levels.json`)[level], backpage = `levelselect.html?level=${level}`, selected, moves = 0, distance = 0;

function select(object) {
	let info = object.data();
	let block = data.grid[info.position.x][info.position.y].block;
	if (block != undefined) {
		selected = block;
		let available = block.CheckMove(data.grid);
		let selector = object.children(".selector");
		selector.children(".button").removeClass("btn-default btn-success disabled");
		["up", "left", "right", "down"].forEach(function(direction) {
			selector.children(`.button.${direction}`).addClass(available[direction] ? "btn-success" : "btn-default disabled");
		});
		$(".selected").hide();
		object.children(".selected").show();
		selector.show();
	}
}

function deselect(object) {
	let selector = object.children(".selector");
	selector.hide();
	selector.children(".button").removeClass("btn-success").addClass("btn-default disabled");
}

let flags = {
	showMoveButtonsUntilHover: function() {
		$(".Object").toArray().forEach(function(object) {
			select($(object));
		});
	},
	showMoveButtonsUntilClick: function() {
		$(".selector").addClass("keepOnHover");
		this.showMoveButtonsUntilHover();
	}
}

$("#game").on("mousemove", ".Object", function() {
	let object = $(this);
	let info = object.data();
	let subclass = eval(info.class)[info.subclass];
	if (subclass.flags.includes("selectable") && !object.hasClass("moving")) select(object);
});

$("#game").on("mouseleave", ".Object", function() {
	let object = $(this);
	let info = object.data();
	let subclass = eval(info.class)[info.subclass];
	// if (subclass.flags.includes("selectable")) selected = undefined;
	if (!object.children(".selector").hasClass("keepOnHover")) deselect(object);
});

$("#game").on("click", ".selector>.button", function() {
	let object = $(this).parent().parent();
	let info = object.data();
	let block = data.grid[info.position.x][info.position.y].block;
	block.velocity = Vector2.FromDirection($(this).data("id"));
	block.Move();
	deselect(object);
	$(".selector").removeClass("keepOnHover");
	update();
});

$(document).on("keypress", function(event) {
	if (selected != undefined && [119, 97, 100, 115].includes(event.which)) {
		if (event.which == 119) {
			selected.velocity = Vector2.FromDirection("up");
		} else if (event.which == 97) {
			selected.velocity = Vector2.FromDirection("left");
		} else if (event.which == 100) {
			selected.velocity = Vector2.FromDirection("right");
		} else if (event.which == 115) {
			selected.velocity = Vector2.FromDirection("down");
		}
		selected.Move();
		deselect($(".selected:visible").parent());
		$(".selector").removeClass("keepOnHover");
		update();
	}
});

$(document).on("keydown", function() {
	// arrow key code
});

function render() {
	// $("#game").css({width: `${data.size.x * 50 + 32}px`, height: `${data.size.y * 50 + 128}px`});
	$("#game").css({width: `${data.size.x * 50 + 32}px`, height: `${data.size.y * 50 + 96}px`});
	if ($("#game").outerWidth() < $(window).width()) {
		$("#game").css({left: ($(window).width() - $("#game").outerWidth()) / 2});
	}
	if ($("#game").outerHeight() < $(window).height()) {
		$("#game").css({top: ($(window).height() - $("#game").outerHeight()) / 2});
	}
	window.scrollBy(($(document).width() - $(window).width()) / 2, ($(document).height() - $(window).height()) / 2);
	for (let x in data.grid) {
		for (let y in data.grid[x]) {
			for (let object in data.grid[x][y]) {
				data.grid[x][y][object].GetVisuals();
			}
		}
	}
}

function init(path, back) {
	if (path == undefined) path = `source/levels/${filename}.json`;
	if (back != undefined) backpage = back;
	data = readJSON(`${__dirname}/../../${path}`);
	if (data != undefined) {
		const name = retrieve(data, "info.name");
		$("title").html(name);
		$("#name").html(name);
		$("#level").html(level);
		const creatorMoves = retrieve(data, "info.creator-score.moves");
		const creatorDistance = retrieve(data, "info.creator-score.distance");
		if (creatorMoves != undefined) $("#creator-moves").html("/ " + creatorMoves);
		if (creatorDistance != undefined) $("#creator-distance").html("/ " + creatorDistance);
		let min = Vector2.FromList(data.board.Tiles[0].position), max = Vector2.FromList(data.board.Tiles[0].position);
		for (let object in data.board) {
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
		for (let x = 0; x < data.size.x; x++) {
			data.grid.push([]);
			for (let y = 0; y < data.size.y; y++) {
				data.grid[x].push({});
			}
		}
		for (let object in data.board) {
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
		$("#error").modal();
		return;
	}
	render();
	for (let flag in flags) {
		if (Array.isArray(retrieve(data, "info.flags")) && data.info.flags.includes(flag)) {
			flags[flag]();
		}
	}
}

function update() {
	$("#moves").html(moves);
	$({distance: Number($("#distance").html())}).animate({distance: distance}, {
		duration: 400,
		step: function() {
			$("#distance").html(Math.round(this.distance));
		}
	});
	let actives = [];
	for (let x in data.grid) {
		for (let y in data.grid[x]) {
			if (typeof data.grid[x][y].plate != "undefined") {
				actives.push(data.grid[x][y].plate.active);
			}
		}
	}
	if (!actives.includes(false)) {
		$("#game").css("pointer-events", "none");
		const savedMoves = retrieve(readJSON(`${__dirname}/../../save-data/progress/${filename}.json`), "moves");
		const savedDistance = retrieve(readJSON(`${__dirname}/../../save-data/progress/${filename}.json`), "distance");
		const bestMoves = savedMoves == undefined ? moves : Math.min(savedMoves, moves);
		const bestDistance = savedDistance == undefined ? distance : Math.min(savedDistance, distance);
		if (!retrieve(readJSON(`${__dirname}/../../save-data/preferences/developer.json`), "disable-progress")) {
			write(`${__dirname}/../../save-data/progress/${filename}.json`, `{\n\t"moves": ${bestMoves},\n\t"distance": ${bestDistance}\n}`);
		}
		const creatorMoves = retrieve(data, "info.creator-score.moves");
		const creatorDistance = retrieve(data, "info.creator-score.distance");
		if (creatorMoves != undefined) $("#win-creator-moves").html("/ " + creatorMoves);
		if (creatorDistance != undefined) $("#win-creator-distance").html("/ " + creatorDistance);
		if (retrieve(readJSON(`${__dirname}/../../save-data/preferences/developer.json`), "level-ratings")) loadFeedback();
		setTimeout(function() {
			// $("#win-moves").html(moves);
			// $("#win-distance").html(distance);
			$("#win").modal();
		}, 400);
		setTimeout(function() {
			$({moves: 0}).animate({moves: moves}, {
				duration: 400,
				step: function() {
					$("#win-moves").text(Math.ceil(this.moves));
				}
			});
			$({distance: 0}).animate({distance: distance}, {
				duration: 400,
				step: function() {
					$("#win-distance").text(Math.ceil(this.distance));
				}
			});
		}, 1000);
		setTimeout(function() {
			if (moves <= creatorMoves) {
				$("#win-moves, #win-creator-moves").addClass(moves == creatorMoves ? "text-success" : "text-warning");
			}
			if (distance <= creatorDistance) {
				$("#win-distance, #win-creator-distance").addClass(distance == creatorDistance ? "text-success" : "text-warning");
			}
		}, 1340);
	}
}

$(".restart").on("click", function() {
	location.reload();
});

$(".exit").on("click", function() {
	location = backpage;
});

$(".continue").on("click", function() {
	let names = readJSON(`${__dirname}/../levels.json`);
	let files = directory(`${__dirname}/../levels/`);
	let offset = 0;
	while (true) {
		offset++;
		if (names[level + offset] != undefined && files.includes(`${names[level + offset]}.json`)) {
			location = `play.html?level=${level + offset}`;
			break;
		} else if (level + offset >= names.length) {
			location = backpage;
			break;
		}
	}
});