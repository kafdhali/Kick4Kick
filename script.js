let container = document.getElementById("container")
let mypaddle = document.getElementById("mypaddle")
let botpaddle = document.getElementById("botpaddle")
let ball = document.getElementById("ball")

let upkey = false;
let downkey= false;

document.addEventListener("keydown", function(event) {
    if(event.key === 'ArrowUp' && mypaddle.offsetTop > 60) {
        mypaddle.style.top= mypaddle.offsetTop - 8 +"px";
    }

    if(event.key === 'ArrowDown' && mypaddle.offsetTop < 870) {
        mypaddle.style.top= mypaddle.offsetTop + 8 +"px";

    }


});


}







