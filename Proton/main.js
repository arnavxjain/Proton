const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

let window;

app.on("ready", () => {
    initializeApp();
    // initializeTray();
});

app.on('window-all-closed', () => {
    app.quit()
});

const initializeApp = () => {
    window = new BrowserWindow({
        // backgroundColor: "red",
        // setting the frame to false to create custom frame
        frame: false,
        // transparent: true,
        // fullscreen: true,
        hasShadow: true,
        resizable: true,
        icon: './assets/ProtonLogo.png',
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
            devTools: true,
        }
    });

    window.loadURL(`file://${path.join(__dirname, 'index.html')}`);
    window.removeMenu(true)

    window.webContents.toggleDevTools();

}

ipcMain.on("proton-maximize", () => {
    window.maximize();
    if (window.isMaximized()) {
        ipcMain.emit("maximized-success");
    }
});

ipcMain.on("proton-minimize", () => {
    window.minimize();
});

ipcMain.on("proton-close", () => {
    app.quit();
});

ipcMain.on("proton-smallify", () => {
    window.unmaximize();
});