const { ipcRenderer, ipcMain } = require("electron");

const cancelBtn = document.getElementsByClassName("cancel-btn")[0];
const maximizeBtn = document.getElementsByClassName("enlarge-toggler")[0];
const minimizeBtn = document.getElementsByClassName("minimize-btn")[0];
const inputMain = document.getElementById("input_main");

const page = document.getElementById("page");

const As = document.getElementsByClassName("link");
console.log(As)

console.log(browser);

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

if (localStorage.getItem("first-time") === null) {
    page.innerHTML = 
    `
    <div class="intro">
        <br/>
        <br/>
        <br/>
        <img src="./assets/ProtonLogo.png" class="intro-img">
        <h1>Welcome To Proton</h1>
        <h3>Your Legendary Browsing Experience Begins Here</h3>
        <br/>
        <br/>
        <h2>Before Getting Started</h2>
        <h4>Proton Might Be A Little Different Than Your Other Usual Browsers</h4>
        <div class="points">
        <span class="point">You can drag the Proton window by using the drag icon at the top left corner</span>
        <span class="point">The window actions are placed in the top right corner</span>
        <span class="point">View your bookmarks and other options by clicking on the bookmark icon</span>
        </div>
        <br/>
        <button class="app-major-btn" onclick="firstDestructure()">Got It! 👍</button>
        <br/>
    </div>
    `;
}

function firstDestructure() {
    localStorage.setItem("first-time", false);
    document.body.style.backgroundImage = "url(./assets/demoBack.png)";
    page.innerHTML = 
    `
    <div class="pop-webs">
    <h2 style="color: black">Popular Websites</h2>
    <div class="recommendation_grid">
        <div class="recom">
            <img src="./assets/youtube.png">
            <div class="tooltip">YouTube</div>
        </div>
        <div class="recom">
            <img src="./assets/netflix.png">
            <div class="tooltip">Netflix</div>
        </div>
        <div class="recom">
            <img src="./assets/amazon.png">
            <div class="tooltip">Amazon</div>
        </div>
        <div class="recom">
            <img src="./assets/insta.png">
            <div class="tooltip">Instagram</div>
        </div>
        <div class="recom">
            <img src="./assets/facebook.png">
            <div class="tooltip">FaceBook</div>
        </div>
        <div class="recom">
            <img src="./assets/wiki.png">
            <div class="tooltip">WikiPedia</div>
        </div>
        <div class="recom">
            <img src="./assets/reddit.png">
            <div class="tooltip">Reddit</div>
        </div>
        <div class="recom">
            <img src="./assets/zoom.png">
            <div class="tooltip">Zoom</div>
        </div>
    </div>
    </div>
    `
}

var AsMain = Array.prototype.slice.call(As);

// AsMain.map((a) => {
//     a.addEventListener("mouseover", () => {
//         page.innerHTML += 
//         `
//         <span class="aTag">${a.href}</span>
//         `;
//     });
//     a.addEventListener("mouseout", () => {
//         console.log('removen');
//         document.getElementsByClassName("aTag")[0].remove();
//     });
// })


inputMain.addEventListener("keypress", (e) => {
    if (e.keyCode == 13) {
        console.log(e.target.value);
    }
})