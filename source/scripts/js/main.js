const {app, shell, BrowserWindow, Menu} = require("electron");
const {readJSON, retrieve} = require("./tools");

let game = null, about = null;

function createWindow() {
	let showTitleBar = retrieve(readJSON(`${__dirname}/../../../save-data/preferences/developer.json`), "show-title-bar") || (process.platform != "darwin");

	game = new BrowserWindow({
		width: 800,
		height: 600 + (showTitleBar ? 22 : 0),
		minWidth: 800,
		minHeight: 600 + (showTitleBar ? 22 : 0),
		resizable: false,
		maximizable: false,
		fullscreenable: false,
		titleBarStyle: showTitleBar ? "default" : "hidden-inset",
		backgroundColor: "#1a1a19",
		webPreferences: {nodeIntegration: true}
	});

	game.loadURL(`file://${__dirname}/../index.html`);

	game.on("closed", function() {game = null;});
}

function createAbout() {
	about = new BrowserWindow({
		width: 600,
		height: 500,
		resizable: false,
		maximizable: false,
		fullscreenable: false,
		frame: false,
		backgroundColor: "#1a1a19"
	});

	about.loadURL(`file://${__dirname}/../about.html`);

	about.on("closed", function() {about = null;});
}

app.on("ready", function() {
	const template = [
		{
			role: "window",
			submenu: [
				{role: "close"},
				{role: "minimize"},
				{type: "separator"},
				{role: "front"}
			]
		}
	];

	if (retrieve(readJSON(`${__dirname}/../../../save-data/preferences/developer.json`), "developer-tools")) {
		template.push({
			label: "Developer",
			submenu: [
				{role: "reload"},
				{role: "forcereload"},
				{role: "toggledevtools"},
				{type: "separator"},
				{label: "Show Application Folder", click: function() {
					// shell.openItem(`${__dirname}/../../../`);
					shell.showItemInFolder(__dirname.split("/").slice(0, -3).join("/"));
				}}
			]
		});
	}

	if (process.platform == "darwin") {
		template.unshift({
			label: app.getName(),
			submenu: [
				{label: `About ${app.getName()}`, click: function() {
					if (about === null) createAbout();
					else about.focus();
				}},
				{type: "separator"},
				{role: "services", submenu: []},
				{type: "separator"},
				{role: "hide"},
				{role: "hideothers"},
				{role: "unhide"},
				{type: "separator"},
				{role: "quit"}
			]
		});
	}

	Menu.setApplicationMenu(Menu.buildFromTemplate(template));
	createWindow();
});

app.on("window-all-closed", app.quit);

app.on("activate", function() {
	if (game === null && about === null) createWindow();
});