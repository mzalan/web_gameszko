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
let wasd = [false, false, false, false];
let dirCap = 1;
let movementTimeout = setInterval(PlayerMoving, 10);
let latestKeys = [0, 0];
let superCharge = 95;
let coinCount = 0;
let tileSize;
let objects = [];
let walls = [];
let restarts = [];

class object {
    constructor(left, top, type) {
        this.top = parseInt(top);
        this.left = parseInt(left);
        this.type = type;
    }
}

function keypress(event) {
    var key = event.which || event.keyCode;
    if (key == 87 || key == 38) {
        KeyControls(0);
    } else if (key == 83 || key == 40) {
        KeyControls(1);
    } else if (key == 65 || key == 37) {
        KeyControls(2);
    } else if (key == 68 || key == 39) {
        KeyControls(3);
    } else if (key == 32 && superCharge == 100) {
        UseSuper();
    }
  
}

function keyup(event) {
    var key = event.which || event.keyCode;
    if (key == 87 || key == 38) {
        wasd[0] = false;
    } else if (key == 83 || key == 40) {
        wasd[1] = false;
    } else if (key == 65 || key == 37) {
        wasd[2] = false;
    } else if (key == 68 || key == 39) {
        wasd[3] = false;
    }
}
function KeyControls(key) {
    console.log(dirCap);
    // wasd[key] = true;
    // latestKeys.push(key);

    // for(let i = 0; i < latestKeys.length; i++) {
    //     if(dirCap == 1 && !(wasd[latestKeys[1]]) && latestKeys.length > 1) {
    //         wasd[latestKeys[0]] = false;
    //     } 
    // }
    // console.log(wasd);
    // console.log(latestKeys);

    wasd.forEach(dir => {dir = false});
    console.log(wasd);
    latestKeys.push(key);

    if(latestKeys.length > 2) {
        latestKeys.shift();
    }
    for(let i = latestKeys.length - 1; i >= latestKeys.length - dirCap; i--) {

        wasd[latestKeys[i]] = true;

    }
    console.log(wasd);
    console.log(latestKeys);
}

function PlayerMoving() {
    if(wasd[0]) {
        UpdatePlayerPosition(0, playerSpeed * -1);
    }
    if(wasd[1]) {
        UpdatePlayerPosition(0, playerSpeed * 1);
    }
    if(wasd[2]) {
        UpdatePlayerPosition(playerSpeed * -1, 0);
    }
    if(wasd[3]) {
        UpdatePlayerPosition(playerSpeed * 1, 0);
    }
}

function UseSuper() {
    superCharge = 0;
    if(wasd[0]) {
        UpdatePlayerPosition(0, playerSpeed * -1 * 15);
    }
    if(wasd[1]) {
        UpdatePlayerPosition(0, playerSpeed * 1 * 15);
    }
    if(wasd[2]) {
        UpdatePlayerPosition(playerSpeed * -1 * 15, 0);
    }
    if(wasd[3]) {
        UpdatePlayerPosition(playerSpeed * 1 * 15, 0);
    }
}

function UpdatePlayerPosition(x, y) {
    let newPlayerX = CheckPosition(playerX, 0, jatekWidth - playerSize, x);
    let newPlayerY = CheckPosition(playerY, 0, jatekHeight - playerSize, y);
    if (!checkWallCollision(newPlayerY + jatekTop, newPlayerX + jatekLeft, playerSize)) {
        if(superCharge + 0.15 >= 100) {
            superCharge = 100;
        }
        else {
            superCharge += 0.42;
        }
        playerX = newPlayerX;
        playerY = newPlayerY;
        player.style.top = playerY + jatekTop + "px";
        player.style.left = playerX + jatekLeft + "px";
        player.style.width = playerSize + "px";
        player.style.height = playerSize + "px";
        superb.style.width = playerSize * 0.8 + "px";
        superb.style.left = playerX + 0.1 * playerSize + jatekLeft - 0.5 + "px";
        superb.style.height = playerSize * 0.15 + "px";
        superb.style.top = jatekTop + playerY + playerSize * 0.75 + "px";
        superb.style.zIndex = 3;
        sprogress.style.width = superCharge / 100 * playerSize * 0.8 + "px";
        sprogress.style.width = superCharge / 100 * playerSize * 0.8 + "px";
        sprogress.style.left = playerX + 0.1 * playerSize + jatekLeft + 0.5 + "px";
        sprogress.style.height = playerSize * 0.15 + "px";
        sprogress.style.top = 1 + jatekTop + playerY + playerSize * 0.75 + "px";
        sprogress.style.zIndex = 3;
        // console.log(playerX + jatekLeft, playerY + jatekTop);
        coincollect(playerY + jatekTop, playerX + jatekLeft, playerSize);
        restart(playerY + jatekTop, playerX + jatekLeft, playerSize);
    }
}


function CheckPosition(player, minBound, maxBound, delta) {
    if (player + delta < minBound) {
        return minBound;
    } else if (player + delta > maxBound) {
        return maxBound;
    } else {
        return player + delta;
    }
}

function Quicktool() {
    // dirCap = 2;
}
//
function GameRender() {
    objects = [];
    walls = [];
    restarts = [];

    if (height * 1.8 > width) {
        jatekWidth = width;
        jatekHeight = width / 1.8;
        jatekTop = (height - jatekHeight) / 2;
        jatekLeft = 0;
    } else {
        jatekWidth = height * 1.8;
        jatekHeight = height;
        jatekTop = 0;
        jatekLeft = (width - jatekWidth) / 2;
    }
    jatekterulet.style.width = jatekWidth + "px";
    jatekterulet.style.height = jatekHeight + "px";
    jatekterulet.style.top = jatekTop + "px";
    jatekterulet.style.left = jatekLeft + "px";
    tileSize = jatekWidth / 36;
    playerSize = tileSize * 1.5;
    playerX = 4 * tileSize;
    playerY = 2 * tileSize;
    playerSpeed = tileSize / 2;
    UpdatePlayerPosition(0, 0);
    fetch('testlevel2.txt').then((res) => res.text()).then((text) => {
        let lines = text.split("\n");
        for (let y = 0; y < 20; y++) {
            for (let x = 0; x < 36; x++) {
                let Nums = lines[y];
                let curNum = parseInt(Nums[x]);
                let tile = document.createElement("span");
                tile.style.width = tileSize + "px";
                tile.style.height = tileSize + "px";
                tile.style.left = x * tileSize + jatekLeft + "px";
                tile.style.top = y * tileSize + jatekTop + "px";
                if (curNum == 0) {
                    tile.className = "sima tile";
                } else if (curNum == 1) {
                    tile.className = "fal tile";
                    walls.push(new object(x * tileSize + jatekLeft, y * tileSize + jatekTop, "wall"));
                } else if (curNum == 2) {
                    tile.className = "coin tile";
                    coinCount++;
                    objects.push(new object(x * tileSize + jatekLeft, y * tileSize + jatekTop, "coin"));
                } else if (curNum == 3) {
                    tile.className = "restart tile";
                    restarts.push(new object(x * tileSize + jatekLeft, y * tileSize + jatekTop, "restart"));
                }
                jatekterulet.append(tile);
            }
        }
    });
}

window.addEventListener("resize", GameRender);

function whatsplayeron(playerTop, playerLeft, playerSize) {
    let collectedstuff = [];
    objects.sort((a, b) => a.type - b.type);
    for (var i = 0; i < objects.length; i++) {
        let objectTop = objects[i].top;
        let objectLeft = objects[i].left;
        let objectSize = tileSize;
        let overlapX = Math.max(0, Math.min(playerLeft + playerSize, objectLeft + objectSize) - Math.max(playerLeft, objectLeft));
        let overlapY = Math.max(0, Math.min(playerTop + playerSize, objectTop + objectSize) - Math.max(playerTop, objectTop));

        if (overlapX > playerSize / 4 && overlapY > playerSize / 4) {
            collectedstuff.push({ index: i, type: objects[i].type });
        }
    }

    return collectedstuff;
}

function coincollect(playerTop, playerLeft, playerSize) {
    let collectedObjects = [];
    for (var i = 0; i < objects.length; i++) {
        let objectTop = objects[i].top;
        let objectLeft = objects[i].left;
        let objectSize = tileSize;
        let overlapX = Math.max(0, Math.min(playerLeft + playerSize, objectLeft + objectSize) - Math.max(playerLeft, objectLeft));
        let overlapY = Math.max(0, Math.min(playerTop + playerSize, objectTop + objectSize) - Math.max(playerTop, objectTop));

        if (overlapX > playerSize / 4 && overlapY > playerSize / 4) {
            collectedObjects.push({ index: i, type: objects[i].type });
        }
    }

    for (var i = 0; i < collectedObjects.length; i++) {
        let objInfo = collectedObjects[i];
        if (objInfo.type === "coin") {
            console.log("Collected coin at index:", objInfo.index);
            coinCount--;
            objects.splice(objInfo.index, 1);
            document.querySelectorAll(".coin")[objInfo.index].className = "sima tile";
        }
    }
}

function restart(playerTop, playerLeft, playerSize) {
    for (var i = 0; i < restarts.length; i++) {
        let objectTop = restarts[i].top;
        let objectLeft = restarts[i].left;
        let objectSize = tileSize;
        let overlapX = Math.max(0, Math.min(playerLeft + playerSize, objectLeft + objectSize) - Math.max(playerLeft, objectLeft));
        let overlapY = Math.max(0, Math.min(playerTop + playerSize, objectTop + objectSize) - Math.max(playerTop, objectTop));

        if (overlapX > playerSize / 4 && overlapY > playerSize / 4) {
            location.reload();
        }
    }
}

function checkWallCollision(playerTop, playerLeft, playerSize) {
    for (let i = 0; i < walls.length; i++) {
        let wallTop = walls[i].top;
        let wallLeft = walls[i].left;
        let wallSize = tileSize;
        let overlapX = Math.max(0, Math.min(playerLeft + playerSize, wallLeft + wallSize) - Math.max(playerLeft, wallLeft));
        let overlapY = Math.max(0, Math.min(playerTop + playerSize, wallTop + wallSize) - Math.max(playerTop, wallTop));
        if (overlapX > 1 && overlapY > 1 && overlapY < playerSize) {
            return true;
        }
    }

    return false;

}
