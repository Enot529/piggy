var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

var piggy = new Image();
var bg = new Image();
var fg = new Image();
var pipeUp = new Image();
var pipeBottom = new Image();

piggy.src = "img/piggy.ico";
bg.src = "img/bg_piggy.jpg";
fg.src = "img/flappy_piggy_fg.png";
pipeUp.src = "img/flappy_piggy_pipeUp.png";
pipeBottom.src = "img/flappy_piggy_pipeBottom.png";

var gap =90;

document.addEventListener("keydown", moveUp);

function moveUp() {
  yPos -=40;
}

var pipe = [];

pipe[0] = {
  x : cvs.width,    //функция движения
  y : 0
}

var score = 0;

var xPos = 10;
var yPos = 150; //свинка
var grav = 0.9;

function draw() {
  ctx.drawImage(bg, 0, 0);

for(var i = 0; i <pipe.length; i++) {
  ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y ); //Блоки
  ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap);

  pipe[i].x--;

  if(pipe[i].x == 50){
    pipe.push({
      x : cvs.width,
      y : Math.floor(Math.random() *pipeUp.height) - pipeUp.height
    });
  }
//столкновение
   if(xPos+ piggy.width >= pipe [i].x
    & xPos <= pipe[i].x + pipeUp.width
     & (yPos <= pipe[i].y + pipeUp.height
     || yPos + piggy.height >= pipe[i].y + pipeUp.height +
     gap) || yPos + piggy.height >= cvs.height - fg.height) {
        location.reload(); // реплей
      }
 if(pipe[i].x ==5) { //счёт
   score++
 }
}


ctx.drawImage(fg, 0, cvs.height - fg.height);
ctx.drawImage(piggy, xPos, yPos); //движение

 yPos += grav;

ctx.fillStyle = "#EF0000";
ctx.font = "24px Bold";
ctx.fillText("Рахунок: " + score, 10, cvs.height - 20)

 requestAnimationFrame(draw);
}

pipeBottom.onload = draw;
