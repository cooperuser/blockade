const {readJSON, retrieve} = require("./js/tools");

let data = readJSON(`${__dirname}/../../package.json`);
let release = retrieve(data, "release");
let version = retrieve(data, "version");
if (release == "indev") {
	$(".version").addClass("label-danger").addClass("label-purple");
} else if (release == "alpha") {
	$(".version").addClass("label-danger");
} else if (release == "beta") {
	$(".version").addClass("label-warning");
} else if (release == "stable") {
	$(".version").addClass("label-success");
} else if (release == "release") {
	$(".version").addClass("label-primary");
} else {
	$(".version").addClass("label-default");
}
$(".version").html((release != undefined ? release + " " : "") + version);