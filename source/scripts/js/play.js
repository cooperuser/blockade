/**
 * Created by Cooper Anderson on 9/27/16 AD.
 */

const fs = require("fs");
const {write, readJSON, retrieve} = require("./js/tools");
const {Vector2} = require("./js/Vectors");
const Tile = require("./js/init/Tiles");
const Plate = require("./js/init/Plates");
const Block = require("./js/init/Blocks");

let level = Number(location.search.split("?")[1].split("&")[0].split('=')[1]);
let data = {}, filename, hasWon = false, backpage = `levelselect.html?level=${level}`, moves = 0, distance = 0;

let flags = {
	showMoveButtonsUntilClick: function() {
		if (!$(".selector").length) {
			let objectData = $(".block").data();
			selected = data.grid[objectData.position.x][objectData.position.y].block;
			let checkMoves = data.grid[objectData.position.x][objectData.position.y].block.CheckMove(data.grid);
			$("#game").append(`
					<div class="selector keepOnHover" data-id='{"position": ${JSON.stringify(objectData.position)}}' style="left: ${objectData.position.x * 50}px; top: ${objectData.position.y * 50}px;">
						<a class="btn btn-${(checkMoves.up) ? "success" : "default"} button up" data-id='up' ${(checkMoves.up) ? "" : "disabled"}></a>
						<a class="btn btn-${(checkMoves.left) ? "success" : "default"} button left" data-id='left' ${(checkMoves.left) ? "" : "disabled"}></a>
						<a class="btn btn-${(checkMoves.right) ? "success" : "default"} button right" data-id='right' ${(checkMoves.right) ? "" : "disabled"}></a>
						<a class="btn btn-${(checkMoves.down) ? "success" : "default"} button down" data-id='down' ${(checkMoves.down) ? "" : "disabled"}></a>
					</div>`);
		}
	},
	showMoveButtonsUntilHover: function() {
		if (!$(".selector").length) {
			let objectData = $(".block").data();
			selected = data.grid[objectData.position.x][objectData.position.y].block;
			let checkMoves = data.grid[objectData.position.x][objectData.position.y].block.CheckMove(data.grid);
			$("#game").append(`
				<div class="selector" data-id='{"position": ${JSON.stringify(objectData.position)}}' style="left: ${objectData.position.x * 50}px; top: ${objectData.position.y * 50}px;">
					<a class="btn btn-${(checkMoves.up) ? "success" : "default"} button up" data-id='up' ${(checkMoves.up) ? "" : "disabled"}></a>
					<a class="btn btn-${(checkMoves.left) ? "success" : "default"} button left" data-id='left' ${(checkMoves.left) ? "" : "disabled"}></a>
					<a class="btn btn-${(checkMoves.right) ? "success" : "default"} button right" data-id='right' ${(checkMoves.right) ? "" : "disabled"}></a>
					<a class="btn btn-${(checkMoves.down) ? "success" : "default"} button down" data-id='down' ${(checkMoves.down) ? "" : "disabled"}></a>
				</div>`);
		}
	}
}

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
	filename = readJSON(`${__dirname}/../levels.json`)[level];
	if (path == undefined) path = `source/levels/${filename}.json`;
	if (back != undefined) backpage = back;
	data = readJSON(`${__dirname}/../../${path}`);
	if (data != undefined) {
		const name = retrieve(data, "info.name");
		$("title").html(name);
		$("#levelName").html(name);
		$("#levelNumber").html(level);
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
		$("#errorModal").modal();
		return;
	}
	render();
	for (let flag in flags) {
		if (Array.isArray(retrieve(data, "info.flags")) && data.info.flags.includes(flag)) {
			flags[flag]();
		}
	}
}

function updateInfo() {
	$("#moves").html(moves);
	$({distance: Number($("#distance").html())}).animate({distance: distance}, {
		duration: 400,
		step: function() {
			$("#distance").html(Math.round(this.distance));
		}
	});
}

function checkWin() {
	let actives = [];
	for (let x in data.grid) {
		for (let y in data.grid[x]) {
			if (typeof data.grid[x][y].plate != "undefined") {
				actives.push(data.grid[x][y].plate.active);
			}
		}
	}
	if (!actives.includes(false)) {
		hasWon = true;
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
		setTimeout(function() {
			$("#winModal").modal();
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
			// $("#win-moves").html(moves);
			// $("#win-distance").html(distance);
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

let selected;

$("#game").on("mousemove", ".Object", function(event) {
	let objectData = $(this).data();
	let subclass = eval(objectData.class)[objectData.subclass];
	let flags = subclass.flags;
	if (flags.includes("selectable") && !$(this).hasClass("moving") && !hasWon) {
		$(".selector").remove();
		selected = data.grid[objectData.position.x][objectData.position.y].block;
		let checkMoves = data.grid[objectData.position.x][objectData.position.y].block.CheckMove(data.grid);
		$("#game").append(`
			<div class="selector" data-id='{"position": ${JSON.stringify(objectData.position)}}' style="left: ${objectData.position.x * 50}px; top: ${objectData.position.y * 50}px;">
				<a class="btn btn-${(checkMoves.up)?"success":"default"} button up" data-id='up' ${(checkMoves.up)?"":"disabled"}></a>
				<a class="btn btn-${(checkMoves.left)?"success":"default"} button left" data-id='left' ${(checkMoves.left)?"":"disabled"}></a>
				<a class="btn btn-${(checkMoves.right)?"success":"default"} button right" data-id='right' ${(checkMoves.right)?"":"disabled"}></a>
				<a class="btn btn-${(checkMoves.down)?"success":"default"} button down" data-id='down' ${(checkMoves.down)?"":"disabled"}></a>
			</div>`)
	}
});

/*$(document).on("mousemove", function(event) {
	if($(".selector").length && !($(event.target).hasClass("selector"))) {
		console.log("test");
	}
});*/

$("#game").on("mouseleave", ".Object", function(event) {
	let objectData = $(this).data();
	let subclass = eval(objectData.class)[objectData.subclass];
	let flags = subclass.flags;
	if (flags.includes("selectable")) {
		//selected = undefined;
	}
});

$("#game").on("click", ".selector>.button", function(event) {
	let info = $(this).parent().data("id");
	let block = data.grid[info.position.x][info.position.y].block
	if (!hasWon) {
		block.velocity = Vector2.FromDirection($(this).data("id"));
		block.Move();
		$(".selector").remove();
		updateInfo();
		checkWin();
	}
});

$("#game").on("mouseleave", ".selector", function(event) {
	if (!$(this).hasClass("keepOnHover")) {
		$(".selector").remove();
	}
});

$(".restart").on("click", function() {
	location.reload();
});

$(".exit").on("click", function() {
	location = backpage;
});

$(".continue").on("click", function() {
	let names = readJSON(`${__dirname}/../levels.json`);
	let files = fs.readdirSync(`${__dirname}/../levels/`);
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

/* setInterval(function() {
	if (selected != undefined && !infoOpen) {
		$("#info").css({right: `${54 - $("#info").width()}px`});
	}
}); */