console.log("connected");

//Create Array of random RGB colors.
var numSquares = 6
var colors = [];
var colorToGuess;
var squares = document.querySelectorAll(".square");
var colorDisp = document.getElementById("colorDisplay");
var header = document.querySelector("header");
var msg = document.querySelector("#message");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");

init();

function init() {
    //Initialize the game.
    setupModeButtons();
    setupSquares();
    reset();
}

function setupModeButtons() {
    for (let i = 0; i < modeButtons.length; i++) {
        //add event listeners
        modeButtons[i].addEventListener("click", function() {
        //remove 'selected' class from both buttons
        modeButtons[0].classList.remove("selected");
        modeButtons[1].classList.remove("selected");
        //add the 'selected'class to clicked button.
        this.classList.add("selected");
            
        //assign numsquare variable. 3 for easy, 6 for hard.
        numSquares = this.textContent === "Easy" ? 3 : 6;
        //call the reset function.
        reset();
        });
    }
}

function setupSquares() {
    for (let i = 0; i < squares.length; i++) {
        //add event listeners to Squares.
        squares[i].addEventListener("click", function() {
        //get color if clicked square and compare with the Color to guess.
        //alert(this.style.backgroundColor);
        var clickedColor = this.style.backgroundColor;
        if (clickedColor === colorToGuess) {
            //if guess is correct, display message and change colors.
            msg.textContent = "Correct!";
            changeColors(clickedColor);
            resetButton.textContent = "Play Again?";
        } else {
            //hide the square.
            this.style.backgroundColor = "#232323";
            msg.textContent ="Try Again!";
        }
        }); 
    }
}


function reset() {
    //reset game.
    resetButton.textContent = "New Colors";
    msg.textContent ="";
    //generate all new colors.
    colors = generateRandomColors(numSquares);
    //pick a color to guess
    colorToGuess = pickColor();
    //display the chosen color.
    colorDisp.textContent = colorToGuess;
    //reset the color of display header.
    header.style.backgroundColor = "steelblue";
    //update all squares
    for (let i = 0; i < squares.length; i++) {
        //if there is color in colors array, 
        //change the backgroung colors of squares
        if (colors[i]) {
            squares[i].style.display = "block";
            squares[i].style.backgroundColor = colors[i];
        } else {
            //else hide the squares.
            squares[i].style.display = "none";
        }   
    }
}


resetButton.addEventListener("click", function() {
    //reset game.
   reset();
});


function changeColors(color) {
    //loop thru all squares and change each color to match the given color.
    //change background color of body and all squares.
    header.style.backgroundColor = color;
  
    for (let i=0; i<6; i++) {
      squares[i].style.backgroundColor = color;
    }

}

function generateRandomColors(num) {
    //make an array
    var arr = [];
    //repeat num times
    for (let i = 0; i < num; i++) {
      //get random color and push into array.  
      arr.push(randomColor());
    }  
    //return that array
    return arr;
}

function randomColor() {
    //pick a "red" from 0 - 255
    var r = getRandomRGB();
    
    //pick a "green" from 0 - 255
    var g = getRandomRGB();

    //pick a "blue" from 0 - 255
    var b = getRandomRGB();

    //Create RGB colour string and return it.
    return "rgb(" + r + ", " + g + ", " + b + ")";
}

function pickColor() {
    //pick a random color.
    var random  = Math.floor(Math.random() * colors.length);
    return colors[random];
}

function getRandomRGB() {
  var x = Math.floor(Math.random() * 256);
  return x;
}