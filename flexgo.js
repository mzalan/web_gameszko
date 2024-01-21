let height = window.innerHeight;
let width = window.innerWidth;
let jatekHeight;
let jatekWidth;
let jatekLeft;
let jatekTop;
let playerSize;
let playerX;
let playerY;
let playerSpeed;
function keypress(event) {
    var key=event.wich || event.keyCode;
    if(key == "87") {
        UpdatePlayerPosition(0, playerSpeed * -1);
    }
    else if(key =="83") {
        UpdatePlayerPosition(0, playerSpeed * 1);
    }
    else if(key =="65") {
        UpdatePlayerPosition(playerSpeed * -1, 0);
    }
    else if(key =="68") {
        UpdatePlayerPosition(playerSpeed * 1, 0);
    }
}

function UpdatePlayerPosition(x, y) {
    playerX = CheckPosition(playerX, 0, jatekWidth - playerSize, x);
    playerY = CheckPosition(playerY, 0, jatekHeight - playerSize, y);
    player.style.top = playerY + jatekTop + "px";
    player.style.left = playerX + jatekLeft  + "px";
    player.style.width = playerSize + "px";
    player.style.height = playerSize + "px";
}

function CheckPosition(player, minBound, maxBound, delta) {
    if(player + delta < minBound) {
        return minBound;
    }
    else if(player + delta > maxBound) {
        return maxBound;
    }
    else {
        return player + delta;
    }
}
function GameRender() { 
    if(height * 1.8 > width) {
        jatekWidth = width;
        jatekHeight = width / 1.8;
        jatekTop = (height - jatekHeight) / 2;
        jatekLeft = 0;
    }
    else {
        jatekWidth = height * 1.8;
        jatekHeight = height;
        jatekTop = 0;
        jatekLeft = (width - jatekWidth) / 2;
    }
    // if(jatekterulet.children.length > 0) {
    //    jatekterulet.children.forEach(child => { if(child.id != player) {jatekterulet.removeChild(child)}});
    // }
    jatekterulet.style.width = jatekWidth+"px";
    jatekterulet.style.height = jatekHeight+"px";
    jatekterulet.style.top = jatekTop + "px";
    jatekterulet.style.left = jatekLeft + "px";
    let tileSize = jatekWidth / 36;
    playerSize = tileSize * 1.5;
    playerX = 4 * tileSize;
    playerY = 5 * tileSize;
    playerSpeed = tileSize/2;
    UpdatePlayerPosition(0, 0);

    for (let i = 0; i < 20; i++) {
        for (let j = 0; j < 36; j++)  {
            let tile = document.createElement("span");
            tile.className = "tile";
            tile.style.width = tileSize+"px";
            tile.style.height = tileSize+"px";
            tile.style.left = j * tileSize +  jatekLeft + "px";
            tile.style.top = i * tileSize + jatekTop + "px";    
            jatekterulet.appendChild(tile);
        } 
    }
}

window.addEventListener("resize", GameRender);
function genMap(){
    let mapContainer = document.getElementById("map")
    let curX = 500
    let curY = 0
    fetch('testlevel.txt')
    .then((res) => res.text())
    .then((text) => {
        let lines = text.split("\n")
        for (let y = 0; y < 18; y++) {
            for (let x = 0; x < 36; x++) {
                let Nums = lines[y].split(" ")
                let curNum = parseInt(Nums[x])
                let tile = document.createElement("div")
                let coords = [curX, curY]
                console.log(typeof(curNum))
                if(curNum == 0){
                    tile.className = "sima"
                }
                else if(curNum == 1){
                    tile.className = "fal"
                    this.colliders.push(coords)
                }
                else if(curNum == 2){
                    tile.className = "coin"
                    this.colliders.push(coords)
                    this.winCol.push(coords)
                }
                else if(curNum == 3){
                    tile.className = "restart"
                    this.killCols.push(coords)
                    this.colliders.push(coords)
                }
                tile.style.top = curY + "px"
                tile.style.left = curX + "px"
                mapContainer.append(tile)
                curX += 50
            }
            curX = 500
            curY += 50
        }
    })
}