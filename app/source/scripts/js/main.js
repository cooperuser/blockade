const electron = require("electron");
// Module to control application life.
const {app} = electron;
// Module to create native browser window.
const {BrowserWindow} = electron;

const {readJSON, retrieve} = require("./tools");

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;

function createWindow() {
	// Create the browser window.
	let showTitleBar = retrieve(readJSON(`${__dirname}/../../../save-data/preferences/developer.json`), "show-title-bar") || (process.platform !== "darwin");
	win = new BrowserWindow({width: 800, height: 600 + (showTitleBar ? 22 : 0), minWidth: 800, minHeight: 600 + (showTitleBar ? 22 : 0), resizable: false, maximizable: false, fullscreenable: false, titleBarStyle: showTitleBar ? "default" : "hidden-inset", backgroundColor: "#191919"});
	if (__dirname == "/Users/cooperanderson/Google Drive/Other/Programming/JetBrains/WebStorm/Blockade/app/source/scripts/js"){
		BrowserWindow.addDevToolsExtension("/Users/cooperanderson/Library/Application\ Support/Google/Chrome\ Canary/Default/Extensions/bomhdjeadceaggdgfoefmpeafkjhegbo/2.2.1_0");
	}

	// and load the index.html of the app.
	win.loadURL(`file://${__dirname}/../index.html`);

	// Emitted when the window is closed.
	win.on("closed", () => {
		// Dereference the window object, usually you would store windows
		// in an array if your app supports multi windows, this is the time
		// when you should delete the corresponding element.
		win = null;
	});
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed.
app.on("window-all-closed", () => {
	// On OS X it is common for applications and their menu bar
	// to stay active until the user quits explicitly with Cmd + Q
	app.quit();
});

app.on("activate", () => {
	// On OS X it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (win === null) {
	createWindow();
}
});