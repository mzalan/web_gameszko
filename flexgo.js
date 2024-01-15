function GameRender() { 
    let height = window.innerHeight;
    let width = window.innerWidth;
    let jatekHeight;
    let jatekWidth;
    if(height * 1.8 > width) {
        jatekWidth = width;
        jatekHeight = width / 1.8;
        jatekterulet.style.top = (height - jatekHeight) / 2 + "px";
        jatekterulet.style.left = "0px";
    }
    else {
        jatekWidth = height * 1.8;
        jatekHeight = height;
        jatekterulet.style.top = "0px";
        jatekterulet.style.left = (width - jatekWidth) / 2 +"px";
    }
    jatekterulet.style.width = jatekWidth+"px";
    jatekterulet.style.height = jatekHeight+"px";
}

window.addEventListener("resize", GameRender);