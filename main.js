const electron = require("electron");

function welcomeWindow() {
    win = new electron.BrowserWindow({ width: 720, height: 640,backgroundColor: '#2e2c29', title:"String"});
    win.loadFile('index.html');
};
electron.app.on('ready', welcomeWindow);