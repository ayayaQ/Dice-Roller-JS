var canvas = document.getElementById("cvs");
var context = canvas.getContext("2d");

// paragraph for value that is returned one roll simulation is done
var valueParagraph = document.getElementById("value");


var diceImage = new Image();
// initial position of the dice
var x = 50;
var y = 50;

// generates velocitys in x and y directions.
var vx = Math.floor((Math.random() * 4) + 8);
var vy = Math.floor((Math.random() * 3) + 4);


// height and width of the dice
var heightWidth = 100;
var color = '#000000';

// bool for checking progress
var inProgress = false;

// bounce counter along with a limit to stop infinite bounce.
var bnc = 0;
var BNC_LIMIT = 6;

// store result of roll
var result;


// draws the dice function
function draw() {
    // currently bouncing
    if (bnc < BNC_LIMIT && inProgress == true) {
        context.drawImage(diceImage, x, y, heightWidth, heightWidth);
        requestAnimationFrame(draw);
    }
    // not bouncing
    else {
        context.drawImage(diceImage, x, y, heightWidth, heightWidth);
    }
}

// Generates the number that the dice rolls too
function roll() {
    var result = Math.floor((Math.random() * 6) + 1);
    switch (result) {

        case 1:
            diceImage.src = 'd1.png';
            break;
        case 2:
            diceImage.src = 'd2.png';
            break;
        case 3:
            diceImage.src = 'd3.png';
            break;
        case 4:
            diceImage.src = 'd4.png';
            break;
        case 5:
            diceImage.src = 'd5.png';
            break;
        case 6:
            diceImage.src = 'd6.png';
            break;
    }
    return result;
}




// function activated by the roll button in the html
function diceRoll() {

    // first roll
    if (inProgress == false) {
        inProgress = true;
    }


    // roll
    if (inProgress == true && bnc == BNC_LIMIT) {
        inProgress = false;

        x = 50;
        y = 50;

        bnc = 0;

        vx = Math.floor((Math.random() * 4) + 8);
        vy = Math.floor((Math.random() * 3) + 4);

        inProgress = true;
        valueParagraph.style.visibility = "hidden";
    }
}



function physics(){
    x += vx;
    y += vy;
    vy *= .99;
    vy += .25;
    vx *= .995;

    if (y + vy > (canvas.height - heightWidth) || y + vy < 0) {
        vy = -vy;
        result = roll();
        bnc += 1;
    }
    if (x + vx > (canvas.width - heightWidth) || x + vx < 0) {
        vx = -vx;
        result = roll();
    }
}


// animate function
function animate() {
    requestAnimationFrame(animate);

    

    if (bnc < BNC_LIMIT && inProgress == true) {
        context.clearRect(0, 0, canvas.width, canvas.height);

        draw();
        physics();
    }
    if (bnc == BNC_LIMIT) {
        context.clearRect(0, 0, canvas.width, canvas.height);

        draw();
        valueParagraph.innerText = "You rolled: " + result;
        valueParagraph.style.visibility = "visible";
    }
}

// gives initial dice value on page load
roll();

animate();