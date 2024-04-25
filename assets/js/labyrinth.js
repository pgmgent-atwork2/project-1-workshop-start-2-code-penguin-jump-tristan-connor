let height = 400;
let width = 400;
let mazeFunctions = [];
let player;


function setup() {
    const myCanvas = createCanvas(width, height);

    mazeFunctions.push(drawMaze1);
    mazeFunctions.push(drawMaze2);
    mazeFunctions.push(drawMaze3);
    mazeFunctions.push(drawMaze4);
    // Add more maze drawing functions as needed

    currentMazeFunction = random(mazeFunctions);

    player = new Player();
}

function drawMaze1() {
    stroke(1)
    line(250, 0, 250, 50);
    line(250, 50, 300, 50);
    line(300, 50, 300, 25);

    line(0, 100, 80, 100);
    line(80, 200, 80, 100);
    line(80, 150, 300, 150);
    line(300, 150, 300, 350);
    line(150, 150, 150, 250);
    line(300, 300, 175, 300);

    line(0, 275, 100, 275);
    line(180, height, 180, 380);
    noStroke()
    fill(0, 255, 150);
    rect(10, 120, 50, 50);
}

function drawMaze2() {
    stroke(1)
    line(0, 300, 50, 300);
    line(50, 300, 50, 100);
    line(50, 100, 150, 100);
    line(150, 100, 150, 175);
    line(150, 175, 300, 175);
    line(300, 100, 300, 300);
    line(300, 300, 200, 300);

    line(150, height, 150, 350);
    line(150, 350, 200, 350);
    noStroke()
    fill(0, 255, 150);
    rect(70, 120, 50, 50);
}

function drawMaze3() {
    stroke(1)
    line(250, 0, 250, 100);

    line(250, 150, width, 150);

    line(150, 250, width, 250);
    line(150, 250, 150, 200);
    line(150, 200, 200, 200);
    line(200, 200, 200, 150);

    line(150, 350, width, 350);
    noStroke()
    fill(0, 255, 150);
    rect(170, 215, 25, 25);
}

function drawMaze4() {
    stroke(1)
    line(100, 0, 100, 200);
    line(100, 200, 300, 200);
    line(300, 200, 300, 100);
    line(300, 100, 200, 100);
    line(200, 100, 200, 150);

    line(150, 350, width, 350);
    noStroke()
    fill(0, 255, 150);
    rect(225, 120, 50, 50);
}

function randomMaze() {
    let index = floor(random(mazeFunctions.length));
    mazeFunctions[index]();

}

function Player() {
    this.x = 10; // Initial x position of the player
    this.y = 10; // Initial y position of the player
    this.targetX = this.x;
    this.targetY = this.y;

    this.show = function () {
        fill(0);
        ellipse(this.x, this.y, 20, 20);
    };

    this.handleKeyPress = function () {
        if (keyIsDown(UP_ARROW)) {
            this.targetY = this.y - 10;
        }
        if (keyIsDown(DOWN_ARROW)) {
            this.targetY = this.y + 10;
        }
        if (keyIsDown(LEFT_ARROW)) {
            this.targetX = this.x - 10;
        }
        if (keyIsDown(RIGHT_ARROW)) {
            this.targetX = this.x + 10;
        }
    };

    this.bounce = function () {
        if (this.x > width || this.x < 0) {
            this.x = 10; // Reset target x position to prevent moving outside the canvas
            this.y = 10; // Reverse horizontal velocity to bounce off the walls
        }
        if (this.y > height || this.y < 0) {
            this.x = 10; // Reset target x position to prevent moving outside the canvas
            this.y = 10; // Reverse vertical velocity to bounce off the walls
        }
    };


    this.update = function () {
        // Move player towards the target position
        this.x = lerp(this.x, this.targetX, 0.1);
        this.y = lerp(this.y, this.targetY, 0.1);
    };
}

function changeDisplay() {
   const compbox = document.querySelector('.completed-box')

   compbox.classList.replace('completed-box--hidden', 'completed-box--visible')
}

function draw() {
    background(255);

    currentMazeFunction();

    const coord = {
        x: Math.round(player.x),
        y: Math.round(player.y)
    };

    const pixelColor = get(coord.x, coord.y);
    if (pixelColor[0] === 0 && pixelColor[1] === 255 && pixelColor[2] === 150) {
        changeDisplay()
        
    } else if (pixelColor[0] !== 255 || pixelColor[1] !== 255 || pixelColor[2] !== 255) {
        console.log("reset position");
        player.x = 10;
        player.y = 10;
        player.targetX = 10;
        player.targetY = 10;
    } else {
        player.handleKeyPress();
    }

    player.show();
    player.bounce();
    player.update();
}

function randomMaze() {
    // Select a random maze function
    currentMazeFunction = random(mazeFunctions);
}
