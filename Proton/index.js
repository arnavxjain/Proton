const { ipcRenderer, ipcMain } = require("electron");

const cancelBtn = document.getElementsByClassName("cancel-btn")[0];
const maximizeBtn = document.getElementsByClassName("enlarge-toggler")[0];
const minimizeBtn = document.getElementsByClassName("minimize-btn")[0];

const browser = document.getElementsByClassName("browser")[0];

cancelBtn.addEventListener("click", () => {
    ipcRenderer.send("proton-close");
})

maximizeBtn.addEventListener("click", () => {
    if (maximizeBtn.src.includes("enlarge.png")) {
        ipcRenderer.send("proton-maximize");
        maximizeBtn.src = "./assets/smaller_screen.png";
    } else {
        ipcRenderer.send("proton-smallify");
        maximizeBtn.src = "./assets/enlarge.png";
    }
});

minimizeBtn.addEventListener("click", () => {
    ipcRenderer.send("proton-minimize");
});

ipcRenderer.on("maximized-success", () => {
    ipcRenderer.send("proton-maximize");
    maximizeBtn.src = "./assets/smaller_screen.png";
});

if (localStorage.getItem("first_item") === null) {
    localStorage.setItem("first_item", false);
    browser.innerHTML = 
    `
    <img src="./assets/ProtonLogoGIF.gif"/>
    `
}