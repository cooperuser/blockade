/**
 * Created by cooperanderson on 9/7/16 AD.
 */
const fs = require("fs");
level = location.search.split("?")[1].split("&")[0].split('=')[1];
custom = location.search.split("?")[1].split("&")[1].split('=')[1];
if (custom == '0') {
	file = fs.readFileSync(`${__dirname}/data/levels/level${level}.json`, "utf8").replace(/(?:\r\n|\r|\n)/g, "").replace("  ", "");
	files = fs.readdirSync(`${__dirname}/data/levels`);
	offset = 1
	while (true) {
		console.log("test");
		if (files.includes("level"+String(Number(level)+offset)+".json")) {
			cont = `play.html?leveldata=${Number(level)+offset}&custom=0`
			break;
		}
		if (Number(level)+offset > files.length) {
			cont = "levelselect.html";
			break;
		}
		offset++;
	}
} else if (custom != '2') {
	file = fs.readFileSync(`${__dirname}/data/levels/user/${level}.json`, "utf8").replace(/(?:\r\n|\r|\n)/g, "").replace("  ", "");
} else {
	file = fs.readFileSync(`${__dirname}/data/levels/temp.json`, "utf8").replace(/(?:\r\n|\r|\n)/g, "").replace("  ", "");
	$("#exit").html("Back").attr("href", "editor.html?play=1");
	$("#levelSelect").remove();
	$("#continue").html("Back to Editor");
	cont = "editor.html?play=1";
}

leveldata = JSON.parse(file);

//
$("#levelNumber").html(level);
$("#levelName").html(leveldata.data.name);
//$("#levelCreators").html(leveldata.data.creators.join(", "));
//
grid = []
moves = 0
$.fn.modal.prototype.constructor.Constructor.DEFAULTS.backdrop = 'static';

for (var y = 0; y < leveldata.grid[1]; y++) {
	$("#table").append(`<tr id="row-${y}"></tr>`);
	for (var x = 0; x < leveldata.grid[0]; x++) {
		$(`#row-${y}`).append(`<td class="cell x-${x} y-${y}"></td>`);
	}
}

for (var x = 0; x < leveldata.grid[0]; x++) {
	grid.push([]);
	for (var y = 0; y < leveldata.grid[1]; y++) {
		grid[x].push([]);
	}
}

function updateProgress() {

}

$("#game").css({"width": `${leveldata.grid[0] * 50}px`})

leveldata.tiles.forEach(function (tile, index) {
	$(`td.x-${tile[0]}.y-${tile[1]}`).append(`<div class="cell x-${tile[0]} y-${tile[1]}"></div>`);
	grid[tile[0]][tile[1]].push("tile");
});

leveldata.plates.forEach(function (plate, index) {
	$("#game").append(`<a href="#" class="btn btn-warning disabled plate" style="left: ${plate[0] * 50}px; top: ${plate[1] * 50}px;"></a>`);
	grid[plate[0]][plate[1]].push("plate");
});

leveldata.blocks.forEach(function (block, index) {
	$("#game").append(`<span data-id="${index}" class="block-group" style="left: ${block[0] * 50}px; top: ${block[1] * 50}px;" id="block-${index}"><a href="#" class="btn btn-info disabled block"></a></span>`);
	grid[block[0]][block[1]].push("block");
});

$("#menu").on("mouseenter", function() {
	setTimeout(function() {$("#arrow").html('«')}, 100)
	$(this).animate({left:0}, 200);
});
$("#menu").on("mouseleave", function() {
	setTimeout(function() {$("#arrow").html('»')}, 100)
	$(this).animate({left:-385}, 200);
});
$("#panel-arrow").on("click", function() {
	setTimeout(function() {$("#panel-arrow").html(($("#panel-arrow").html() == '»')?'«':'»')}, 100)
	$("#panel").animate({left:($("#panel").css("left") == "542px")?742:542}, 200);
});
$("#continue").on("click", function() {
	updateProgress();
	window.location = cont;
});
$("#levelSelect").on("click", function() {
	updateProgress();
	window.location = "levelselect.html";
});
$("#restart").on("click", function() {
	location = location.pathname + location.search;
});
$("#game").on("mouseenter", ".block-group", function() {
	id = $(this).data("id");
	$(this).addClass("mouseover");
	x = leveldata.blocks[id][0]; y = leveldata.blocks[id][1];
	var vert = [];
	var horz = [];
	for (var i = -1; i < 2; i += 2) {
		vert[(i < 0)?0:1] = {
			type: (grid[x][y+i] instanceof Array && grid[x][y+i].includes("tile") && (!grid[x][y+i].includes("block")))?"success":"default",
			disable: (grid[x][y+i] instanceof Array && grid[x][y+i].includes("tile") && (!grid[x][y+i].includes("block")))?"":"disabled ",
		}
	}
	for (var j = -1; j < 2; j += 2) {
		horz[(j < 0)?0:1] = {
			type: (grid[x+j] instanceof Array && grid[x+j][y] instanceof Array && grid[x+j][y].includes("tile") && (!grid[x+j][y].includes("block")))?"success":"default",
			disable: (grid[x+j] instanceof Array && grid[x+j][y] instanceof Array && grid[x+j][y].includes("tile") && (!grid[x+j][y].includes("block")))?"":"disabled ",
		}
	}
	$(this).append(`<span class="button-group"><a href="#" class="btn btn-${vert[0].type} directional-button directional-button-vertical" ${vert[0].disable}style="left: 0px; top: -20px;" id="up" data-id="${id}"></a>
<a href="#" class="btn btn-${vert[1].type} directional-button directional-button-vertical" ${vert[1].disable}style="left: 0px; top: 20px;" id="down" data-id="${id}"></a>
<a href="#" class="btn btn-${horz[0].type} directional-button directional-button-horizontal" ${horz[0].disable}style="left: -20px; top: 0px;" id="left" data-id="${id}"></a>
<a href="#" class="btn btn-${horz[1].type} directional-button directional-button-horizontal" ${horz[1].disable}style="left: 20px; top: 0px;" id="right" data-id="${id}"></a></span>`)
	//$(".block-group").animate({left: "200px"})
});
$("#game").on("mouseleave", ".block-group", function() {
	$(this).removeClass("mouseover");
	$("span:last-child", $(".block-group")).remove();
});
$("#game").on("click", ".directional-button", function() {
	if (!$(this).attr("disabled")) {
		move();
		id = $(this).data("id");
		direction = $(this).attr("id");
		directions = {"up": [0, -1], "down": [0, 1], "left": [-1, 0], "right": [1, 0]};
		dir = {x: directions[direction][0], y: directions[direction][1]};
		block = {x: leveldata.blocks[id][0], y: leveldata.blocks[id][1]};
		count = 0;
		while (grid[block.x + dir.x] instanceof Array && grid[block.x + dir.x][block.y + dir.y] instanceof Array && grid[block.x + dir.x][block.y + dir.y].includes("tile") && (!grid[block.x + dir.x][block.y + dir.y].includes("block"))) {
			for(var i = 0; i < grid[block.x][block.y].length; i++) {
				if(grid[block.x][block.y][i] == "block") {
					grid[block.x][block.y].splice(i, 1);
				}
			}
			block.x += dir.x; block.y += dir.y;
			leveldata.blocks[id] = [block.x, block.y];
			grid[block.x][block.y].push("block");
		}
		$("span:last-child", $(".block-group")).remove();
		$(`.block-group#block-${id}`).animate({left: `${block.x * 50}px`, top: `${block.y * 50}px`}, 400, "swing", checkForWin);
	}
});
function move() {
	moves++;
	$("#moves").html(moves);
}
function checkForWin() {
	pressed = []
	leveldata.plates.forEach(function (plate, index) {
		pressing = []
		leveldata.blocks.forEach(function (block, index) {
			if (plate[0] == block[0] && plate[1] == block[1]) {
				pressing.push(true);
			} else {
				pressing.push(false);
			}
		});
		if (pressing.includes(true)) {
			pressed.push(true);
		} else {
			pressed.push(false);
		}
	});
	if (!pressed.includes(false)) {
		win()
	}
}
function win() {
	clearInterval(clock);
	setTimeout(function () {
		$("#winModal").modal("toggle")
	}, 200);
}
time = 0;
clock = setInterval(function() {time += 1; $("#time").html(Math.floor(time/250))}, 1);
$(document).on("keydown", function(event) {
	if ($(".mouseover").length == 1) {
		if (event.key == "w") {
			$("#up").trigger("click");
		} else if (event.key == "a") {
			$("#left").trigger("click");
		} else if (event.key == "s") {
			$("#down").trigger("click");
		} else if (event.key == "d") {
			$("#right").trigger("click");
		}
	}
});