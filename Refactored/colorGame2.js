var numSquares = 6;
var colors = [];												//Random colors(array) is intialized in the variable colors.
var pickedColor;	
var squares = document.querySelectorAll(".square");  			//To select all the squares.										
var colorDisplay = document.querySelector("#colorDisplay");		//To display the color(rgb) that is to be identify in the game.
var messageDisplay = document.querySelector("#message");		//To display message/result.
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset"); 
var modeButtons = document.querySelectorAll(".mode");

init();

function init(){
	//Mode button event listner.
	setupModeButton();

	//Setting up squares.
	setupSquares();
	
	reset();
};

function reset(){													//function that resets the squares into different colors.
	colors = generateRandomColors(numSquares);						//adding random colors to colrs(array).
	pickedColor = pickColor();										//Selects a random color(item) from colors(array).
	colorDisplay.textContent = pickedColor;							//Displays the colors that is picked for the challenge.
	h1.style.backgroundColor = "steelblue";
	messageDisplay.textContent = "";
	resetButton.textContent = "New Colors";

	for(var i=0; i<squares.length; i++){							//Iterating through each square.
		if(colors[i]){
			squares[i].style.display = "block";						//displaying all the squares that are present.
			squares[i].style.backgroundColor = colors[i];			//Changing the color of the squares with te respective index of the colors(array).

		}else{
			squares[i].style.display = "none";
		}
	}
};

var resetButton = document.querySelector("#reset");							//To select the New Game button.
resetButton.addEventListener("click", function(){							//adding click event
	reset();
});

function changeColors(color){									//Function that changes every square's color to the correct square's color.
	//loop through colors.
	for(var i=0; i<squares.length; i++){
		squares[i].style.backgroundColor = color;
	}
};

function pickColor(){								    			//Function that chooses a color from the colors(array) randomly.
	var random = Math.floor(Math.random() * colors.length);			//random event operator.
	return colors[random];											//Return the random value.
}

function generateRandomColors(num){									//Function that pushes the randomly generated colors into the colors array.
	//make an arry.
	var arr = [];
	//repeat num times.
	for(var i=0; i<num; i++){
	//add num random colors to array.
		arr.push(randomColor());
	}
	//return that array.
	return arr;
}

function randomColor(){												//Function that generates random RGB color.
	//pick a "red" from 0 - 255.
	var r = Math.floor(Math.random() * 256);						//Generates random number between 0 to 256.
	//pick a "green" from 0 - 255.
	var g = Math.floor(Math.random() * 256);
	//pick a "blue" from 0 - 255.
	var b = Math.floor(Math.random() * 256);
	return "rgb(" + r + ", " + g +", " +b + ")";					//return "rgb(r, g, b)".
};

function setupModeButton(){
	for(var i=0; i<modeButtons.length; i++){
		modeButtons[i].addEventListener("click",function(){
			modeButtons[0].classList.remove("selected");
			modeButtons[1].classList.remove("selected");
			this.classList.add("selected");
			this.textContent === "Easy"? numSquares = 3: numSquares = 6;   		//Ternary operator replacement of IF statement.
			reset();
		});
	}
}

function setupSquares(){
	for(var i=0; i<squares.length; i++){							//Iterating through each square.
		// add event listeners to the sqaures.
		squares[i].addEventListener("click",function(){				//adding the click event.
			var clickedColor = this.style.backgroundColor;			//assigning the clickedColor to be same as the square[i] color.
			if(clickedColor === pickedColor){						//check the clickedColor against the pickedColor.
				messageDisplay.textContent = "Correct!";			//message displays Correct.
				changeColors(clickedColor);							//After correct answer every square changes to the correct square's color.
				h1.style.backgroundColor = clickedColor;			//After the correct answer h1 tag changes its background to the correct square's color.
				resetButton.textContent = "Play Again?";
			}
			else{
				this.style.backgroundColor = "#232323";				//If the user clicks on the wrong square(color) it dissapears into the background.
				messageDisplay.textContent = "Try Again!";			//message displays Try Again.
			}
		});
	}
}