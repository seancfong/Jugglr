// CANVAS INITIALIZATION
var canvas = document.querySelector("canvas");

canvas.height = window.innerHeight - 20;
canvas.width = window.innerHeight * 0.7;

var c = canvas.getContext("2d");

// VARIABLES
const setRadius = 20;
const padWidth = 100;
const padHeight = 15;
var redBall;
var greenBall;
var blueBall;
var player;
var playerColorID = 0;
var keyDown = false;
var playerx = (canvas.width / 2) - (padWidth / 2);
var mousePos;
var gravity = 0.05;
var lose = false;
var points = 0;
var onUp = true;

// EVENT HANDLING
window.addEventListener("click", function(event) {
    playerColorID++;
});

window.addEventListener("keydown", function(event) {
  if (event.keyCode == 32 && keyDown == false) {
    playerColorID++;
    keyDown = true;
  }
});

window.addEventListener("keyup", function(event) {
  if (event.keyCode == 32) {
    keyDown = false;
  }
});

window.addEventListener("mousemove", function(event) {
  // mousePos = (event.x - canvas.width + 20) - (padWidth / 2);
  mousePos = event.x;
  player.x = (mousePos - ((window.innerWidth / 2) - (canvas.width / 2))) - (padWidth / 2);
});

// FUNCTIONS
function Paddle(x) {
  this.x = x;

  this.update = function() {

    // Change Color
    this.colorID = playerColorID;
    if (this.colorID % 3 == 0) {
      this.color = "#ff0000";
    } else if (this.colorID % 3 == 1) {
      this.color = "#00ff00";
    } else if (this.colorID % 3 == 2) {
      this.color = "#0000ff";
    }


    this.draw();
  }

  this.draw = function() {
    c.fillStyle = this.color;
    c.fillRect(this.x, canvas.height - padHeight, padWidth, padHeight);
  }
}

function Ball(x, y, dx, dy, radius, ballColorID) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.ballColorID = ballColorID;

  this.update = function() {
    if (this.y + this.radius > canvas.height - padHeight) {
      if (this.color == player.color) {
        if (this.x > player.x && this.x < player.x + padWidth){
          this.dy = -this.dy;
          console.log("hit!");
          points++;
          console.log(points);
        } else {
          lose = true;
        }

      } else {
        lose = true;
      }

    } else {
      this.dy += gravity;
    }

    if (this.x - this.radius < 0 || this.x + this.radius > canvas.width) {
      this.dx = -this.dx;
    }

    if (this.y <= 53) {
      onUp = true;
    } else {
      onUp = false;
    }

    if (onUp && gravity < 1) {
      gravity += 0.000007;
      console.log(gravity);
    }

     this.x += this.dx;
     this.y += this.dy;
    // Change Color
    this.colorID = ballColorID;
    if (this.colorID % 3 == 0) {
      this.color = "#ff0000";
    } else if (this.colorID % 3 == 1) {
      this.color = "#00ff00";
    } else if (this.colorID % 3 == 2) {
      this.color = "#0000ff";
    }


    this.draw();
  }

  this.draw = function() {
      c.beginPath();
      c.arc(this.x, this.y, this.radius, 0 , Math.PI * 2, false);
      c.fillStyle = this.color;
      c.fill();
      c.closePath();
  }

}

// INITIALIZATION FUNCTIONS
function showLost() {
  console.log("You just lost!");
  location.reload();

}

function init() {
  player = new Paddle(playerx);
  redBall = new Ball(canvas.width / 2, 50, (Math.random() * 2.5) - 1.25, 0, setRadius, 0);

}

function animate() {
  c.clearRect(0, 0, canvas.width, canvas.height);
  // Background stuff
  c.fillStyle = "#999";
  c.font = "80px Impact";
  c.textAlign = "center";
  c.fillText("Jugglr!", canvas.width / 2, 100);
  c.font = "400px Arial";
  c.fillStyle = "#777";
  c.fillText(points, canvas.width / 2, (canvas.height / 2) + 200);

  if (points < 6 && points > 3) {
    c.font = "20px Arial";
    c.fillText("Press SPACE to change Paddle color.", canvas.width / 2, 150);
    c.fillText("Match the paddle color with the ball color.", canvas.width / 2, 180);
    c.fillText("We'll add in a green ball soon just for you!", canvas.width / 2, 210);
  }

  if (points < 2) {
    c.font = "20px Arial";
    c.fillText("Keep the ball bouncing!", canvas.width / 2, 150);
  }

  if (points == 3) {
    c.font = "20px Arial";
    c.fillText("There you go!", canvas.width / 2, 150);
  }

  if (points == 28) {
    c.font = "20px Arial";
    c.fillText("Here's a blue ball.", canvas.width / 2, 150);
    c.fillText("Good luck!", canvas.width / 2, 180);
  }

  // Animation
  if (lose == false){
      requestAnimationFrame(animate);
  } else {
    showLost();
  }

  redBall.update();
  player.update();
  if (blueBall) {
    blueBall.update();
  }

  if (greenBall) {
    greenBall.update();
  }

  if (points == 5) {
    greenBall = new Ball(canvas.width / 2, 50, (Math.random() * 2.5) - 1, 0, setRadius, 1);
  }

  if (points == 28) {
    blueBall = new Ball(canvas.width / 2, 50, (Math.random() * 2.5) - 1, 0, setRadius, 2);
  }


}

init();
animate();
