const { app, BrowserWindow, ipcMain } = require("electron");
const open = require("open");
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
            // backgroundThrottling: false,
            devTools: true,
        }
    });

    window.loadURL(`file://${path.join(__dirname, 'index.html')}`);
    window.removeMenu(true)

    // window.webContents.toggleDevTools();

}

ipcMain.on("proton-maximize", () => {
    if (window.isMinimized()) {
        window.maximize();
    } else {
        window.minimize();
    }
});

ipcMain.on("proton-minimize", () => {
    window.minimize();
});