//elements from DOM
let startGame = document.getElementById("startGame");
let reStartGame = document.getElementById("reStartGame");
let failMessage = document.getElementById("failed");

let cvs = document.getElementById("myCanvas");
let ctx = cvs.getContext("2d");

// load images

let snitch = new Image();
let bg = new Image();
let fg = new Image();
let pipeNorth = new Image();
let pipeSouth = new Image();
let duddley = new Image()

snitch.src = "images/snitch.png";
bg.src = "images/bg.jpg";
fg.src = "images/fg.jpg";
pipeNorth.src = "images/pipeNorth.png";
pipeSouth.src = "images/pipeSouth.png";



// game components letiables

let gap = 85;
let constant;

let bX = 10;
let bY = 150;

let gravity = 1.1;

let score = 0;


// on key down
document.addEventListener("touchStart", moveUp);
document.addEventListener("keydown", moveUp);

function moveUp() {
  bY -= 25;
}

// pipe coordinates

let pipe = [];

pipe[0] = {
  x: cvs.width,
  y: 0
};

// draw images

function draw() {

  failMessage.style.display = "none";
  reStartGame.style.display="none;"

  ctx.drawImage(bg, 0, 0);

  //drawing pipes
  for (let i = 0; i < pipe.length; i++) {

    constant = pipeNorth.height + gap;
    ctx.drawImage(pipeNorth, pipe[i].x, pipe[i].y);
    ctx.drawImage(pipeSouth, pipe[i].x, pipe[i].y + constant);

    pipe[i].x--;

    if (pipe[i].x == 125) {
      pipe.push({
        x: cvs.width,
        y: Math.floor(Math.random() * pipeNorth.height) - pipeNorth.height
      });
    }


    // detect collision

    if (bX + snitch.width >= pipe[i].x && bX <= pipe[i].x + pipeNorth.width && (bY <= pipe[i].y + pipeNorth.height || bY + snitch.height >= pipe[i].y + constant) || bY + snitch.height >= cvs.height - fg.height) {

      failMessage.style.display = "block";
      failMessage.innerHTML = ` Good Job! Your score is : ${score}`;
      startGame.style.display="none";
      reStartGame.style.display="block";
      return ;

    };


  if (pipe[i].x == 5) {
    score++;
    //scor.play();
  }


}

ctx.drawImage(fg, 0, cvs.height - fg.height);

ctx.drawImage(snitch, bX, bY);

bY += gravity;

ctx.fillStyle = "#000";

ctx.fillText("Score : " + score, 10, cvs.height - 20);

requestAnimationFrame(draw);


}
startGame.addEventListener("click", draw);
reStartGame.addEventListener("click", function(){

  failMessage.style.display="none";
    location.reload();
})
