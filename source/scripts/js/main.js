const {app, shell, BrowserWindow, Menu} = require("electron");
const {readJSON, retrieve} = require("./tools");

let win;

function createWindow() {
	let showTitleBar = retrieve(readJSON(`${__dirname}/../../../save-data/preferences/developer.json`), "show-title-bar") || (process.platform != "darwin");

	win = new BrowserWindow({
		width: 800,
		height: 600 + (showTitleBar ? 22 : 0),
		minWidth: 800,
		minHeight: 600 + (showTitleBar ? 22 : 0),
		resizable: false,
		maximizable: false,
		fullscreenable: false,
		titleBarStyle: showTitleBar ? "default" : "hidden-inset",
		backgroundColor: "#1a1a19"
	});

	win.loadURL(`file://${__dirname}/../index.html`);

	win.on("closed", function() {win = null;});
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
				{role: "about"},
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
	if (win === null) createWindow();
});