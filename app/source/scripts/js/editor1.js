/**
 * Created by cooperanderson on 9/7/16 AD.
 */
const fs = require("fs");
var width = 15;
var height = 9;
var grid = []
var leveldata = {
	grid: [width, height],
	tiles: [

	],
	blocks: [

	],
	plates: [

	],
	data: {

	}
}
var baseleveldata = {
	grid: [width, height],
	tiles: [

	],
	blocks: [

	],
	plates: [

	],
	data: {

	}
}

var select = "blank";

var place = {
	"tile": function(pos) {
		$(`.cell.x-${pos.x}.y-${pos.y}`).append(`<div class="tile ob-x-${pos.x} ob-y-${pos.y}"></div>`);
	},
	"block": function(pos) {
		$("#game").append(`<span class="block-group ob-x-${pos.x} ob-y-${pos.y}" style="left: ${pos.x * 50}px; top: ${(pos.y * 50)+"px"}; position: absolute;" data-id='{"x": ${pos.x}, "y": ${pos.y}}'><a href="#" class="btn btn-info disabled block" data-id='{"x": ${pos.x}, "y": ${pos.y}}'></a></span>`)
	},
	"plate": function(pos) {
		$("#game").append(`<a href="#" class="btn btn-warning disabled plate ob-x-${pos.x} ob-y-${pos.y}" style="left: ${pos.x * 50}px; top: ${(pos.y * 50)+"px"}; position: absolute;"></a>`);
	}
}

for (var x = 0; x < width; x++) {
	grid.push([]);
	for (var y = 0; y < height; y++) {
		grid[x].push([]);
	}
}

function remove(pos) {
	$(`.ob-x-${pos.x}.ob-y-${pos.y}`).remove();
}

function setGrid() {
	leveldata = {
		grid: [width, height],
		tiles: [

		],
		blocks: [

		],
		plates: [

		],
		data: {

		}
	};
	for (var x = 0; x < grid.length; x++) {
		for (var y = 0; y < grid[x].length; y++) {
			for (var z = 0; z < grid[x][y].length; z++) {
				item = grid[x][y][z];
				if (item == "tile") {
					leveldata.tiles.push([x, y]);
				}
				if (item == "block") {
					leveldata.blocks.push([x, y]);
				}
				if (item == "plate") {
					leveldata.plates.push([x, y]);
				}
			}
		}
	}
}

for (var j = 0; j < height; j++) {
	$("#table>tbody").append(`<tr id="row-${j}"></tr>`);
	for (var i = 0; i < width; i++) {
		$(`#row-${j}`).append(`<td class="cell x-${i} y-${j}" data-id='{"x": ${i}, "y": ${j}}'></td>`);
	}
}

var _GET = {}
for (var g = 0; g < location.search.slice(1).split('&').length; g++) {
	_GET[location.search.slice(1).split('&')[g].split("=")[0]] = location.search.slice(1).split('&')[g].split("=")[1]
}

if (location.search.split("?")[1].split("&")[0].split('=')[1] == '1') {
	leveldata = JSON.parse(fs.readFileSync(`${__dirname}/../../save-data/user-levels/.last-opened.json`, "utf8").replace(/(?:\r\n|\r|\n)/g, "").replace("  ", ""));
	leveldata.tiles.forEach(function(item, index) {
		grid[item[0]][item[1]].push("tile");
		place["tile"]({x: item[0], y: [item[1]]});
	});
	leveldata.plates.forEach(function(item, index) {
		grid[item[0]][item[1]].push("plate");
		place["plate"]({x: item[0], y: [item[1]]});
	});
	leveldata.blocks.forEach(function(item, index) {
		grid[item[0]][item[1]].push("block");
		place["block"]({x: item[0], y: [item[1]]});
	});
} else if (_GET["play"] == '2') {
	name = _GET["name"]
	leveldata = JSON.parse(fs.readFileSync(`${__dirname}/../../save-data/user-levels/${name}`, "utf8").replace(/(?:\r\n|\r|\n)/g, "").replace("  ", ""));
	leveldata.tiles.forEach(function(item, index) {
		grid[item[0]][item[1]].push("tile");
		place["tile"]({x: item[0], y: [item[1]]});
	});
	leveldata.plates.forEach(function(item, index) {
		grid[item[0]][item[1]].push("plate");
		place["plate"]({x: item[0], y: [item[1]]});
	});
	leveldata.blocks.forEach(function(item, index) {
		grid[item[0]][item[1]].push("block");
		place["block"]({x: item[0], y: [item[1]]});
	});
}

$("#table").on("click", ".cell", function() {
	var pos = $(this).data("id");
	if (select != "blank") {
		if (!grid[pos.x][pos.y].includes(select)) {
			if (select != "tile" && !grid[pos.x][pos.y].includes("tile")) {
				grid[pos.x][pos.y].push("tile");
				place["tile"](pos);
			}
			grid[pos.x][pos.y].push(select);
			place[select](pos);
		}
	} else {
		grid[pos.x][pos.y] = []
		remove(pos);
	}
});

$("#table").on("contextmenu", ".cell", function() {
	var pos = $(this).data("id");
	type = grid[pos.x][pos.y].pop();
	if (type != undefined) {
		type += (type == "block")?"-group":"";
		$(`.${type}.ob-x-${pos.x}.ob-y-${pos.y}`).remove();
	}
});

$(".select").on("click", function() {
	$(`.select-${select}`).removeClass("selected");
	select = $(this).data("id");
	$(`.select-${select}`).addClass("selected");
	$("#selector").animate({left: $(this).parent().position().left, width: $(this).parent().width() + 6}, 200);
})

$("#menu").on("mouseenter", function() {
	setTimeout(function() {$("#arrow").html("«")}, 100)
	$(this).stop().animate({left:0}, 200);
});

$("#menu").on("mouseleave", function() {
	setTimeout(function() {$("#arrow").html("»")}, 100)
	$(this).stop().animate({left:-353}, 200);
});

$("#openButton").on("click", function() {
	files = fs.readdirSync(`${__dirname}/../../save-data/user-levels/`);
	$("#selectBox").empty();
	for (var i = 0; i < files.length; i++) {
		if (files[i][0] != '.') {
			levelName = files[i].split('.')
			levelName.pop();
			levelName = levelName.join('.');
			$("#selectBox").append(`<option>${levelName}</option>`)
		}
	}
});

$("#open").on("click", function() {
	if ($("select").val().length > 0) {
		name = $("select").val();
		location = location.pathname + "?play=2&name="+name+".json";
	}
});

$("#play").on("click", function() {
	setGrid();
	fs.writeFileSync(`${__dirname}/../../save-data/user-levels/.last-opened.json`, JSON.stringify(leveldata), "utf8");
	location = "playOld.html?leveldata=.last-opened&custom=2";
})

$("#save").on("click", function() {
	setGrid();
	if ($("#name").val() != "" && $("#name").val()[0] != '.') {
		name = $("#name").val();
		fs.writeFileSync(`${__dirname}/../../save-data/user-levels/${name}.json`, JSON.stringify(leveldata), "utf8");
		$("#saveModal").modal("toggle");
	}
});

$(document).on("keydown", function(event) {
	if (!$("#saveModal").hasClass("in")) {
		if (event.key == "1") {
			$(`.select-${"blank"}`).trigger("click");
		} else if (event.key == "2") {
			$(`.select-${"tile"}`).trigger("click");
		} else if (event.key == "3") {
			$(`.select-${"block"}`).trigger("click");
		} else if (event.key == "4") {
			$(`.select-${"plate"}`).trigger("click");
		} else if (event.key == "p") {
			$("#play").trigger("click");
		}
	}
});