// class terkep {
//     constructor(tileSize, jatekWidth, jatekHeight, jatekTop, jatekLeft, width, height) {
//         fetch('testlevel.txt')
//         .then((res) => res.text())
//         .then((text) => {
//             let lines = text.split("\n");
//         })
//         console.log(typeof(lines))
//         this.coins = lines[0];
//         this.levelnum = lines[1];
//         for (let i = 2; i < 22; i++) {
//             this.genMap(lines[i], tileSize, jatekWidth, jatekHeight, jatekTop, jatekLeft, width, height);
//         }
//     }
//         genMap(sor, tileSize, jatekWidth, jatekHeight, jatekTop, jatekLeft){
//         let jatekterulet = document.getElementById("jatekterulet")
//         for (let x = 0; x < 36; x++) {
//             let tile = document.createElement("span");
//             tile.className = "tile";
//             tile.style.width = tileSize+"px";
//             tile.style.height = tileSize+"px";
//             tile.style.left = j * tileSize +  jatekLeft + "px";
//             tile.style.top = i * tileSize + jatekTop + "px";    
//             if(sor[x] == 0){
//                 tile.className = "sima";
//             }
//             else if(sor[x] == 1){
//                 tile.className = "fal";

//             }
//             else if(sor[x] == 2){
//                 tile.className = "coin";
//             }
//             else if(sor[x] == 3){
//                 tile.className = "restart";
//             }
//             jatekterulet.append(tile)
//         }
//         }
//     }
// export { terkep }