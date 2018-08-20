const { app, BrowserWindow, Menu } = require("electron");
// IPC Main 进程
const ipc = require('electron').ipcMain;

// Menu 菜单功能
// 主要参考这篇教程 https://coursetro.com/posts/code/119/Working-with-Electron-Menus---Tutorial

let win;
function createWindow() {

    win = new BrowserWindow({ width: 720, height: 640, backgroundColor: '#191919', title: "String" });
    win.loadFile('index.html');

    // 在创建窗口时，先定义菜单；
    var menu = Menu.buildFromTemplate([
        {
            label: 'String',
            submenu: [
                { label: 'Open', click() { /*win.webContents.send('excuteCom', "open");*/ }, accelerator: 'CmdOrCtrl+O' },
                { label: 'Save', click() { win.webContents.send('excuteCom', "save"); }, accelerator: 'CmdOrCtrl+S' },
                { type: 'separator' },  // 分隔线
                {
                    label: 'Exit', click() {
                        app.quit();
                    }, accelerator: 'CmdOrCtrl+Q'
                }
            ]
        },
        {
            label: 'Edit',
            submenu: [
                { label: 'Copy', role: 'copy', click() { console.log("点击了拷贝菜单项") }, accelerator: 'CmdOrCtrl+C' },
                { label: 'Paste', role: 'paste', click() { console.log("点击了粘贴菜单项") }, accelerator: 'CmdOrCtrl+V' },
                { type: 'separator' },  // 分隔线
                { label: 'Code Shelf', click() { console.log("点击了String菜单项") }, accelerator: 'CmdOrCtrl+W' },
                { type: 'separator' },  // 分隔线
                { label: 'Full Screen', role: 'togglefullscreen', click() { console.log("点击了全屏菜单项") }, accelerator: 'CmdOrCtrl+F' },
            ]
        }
    ]);
    Menu.setApplicationMenu(menu);

    // 打开开发者工具
    win.webContents.openDevTools();

    // 当 window 被关闭，这个事件会被触发。
    win.on('closed', () => {
        // 取消引用 window 对象，如果你的应用支持多窗口的话，
        // 通常会把多个 window 对象存放在一个数组里面，
        // 与此同时，你应该删除相应的元素。
        win = null;
        // app.quit();
    })
};

// 应用准备好后打开第一个窗口
app.on('ready', createWindow);

// 当全部窗口关闭时退出。
app.on('window-all-closed', () => {
    // 在 macOS 上，除非用户用 Cmd + Q 确定地退出，
    // 否则绝大部分应用及其菜单栏会保持激活。
    // if (process.platform !== 'darwin') {
    app.quit();
    // };
});

// 向渲染界面发命令
function sendCom(n) {
    win.webContents.send('excuteCom', n);
    // ipc.on('update-notify-value', function (event, n) {
    //     win.webContents.send('excuteCom', n)
    // });
};