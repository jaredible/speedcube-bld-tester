var cubelet0 = document.getElementById("cubelet-0");
var cubelet1 = document.getElementById("cubelet-1");
var letter = document.getElementById("letter");

var letters = "ABCDEFGHIJKLMNOPZRSTUVWY";
var colors = ["yellow", "red", "green", "orange", "white", "blue"];

var edgePairs = [
	// Top
	["A", "W"],
	["B", "M"],
	["C", "I"],
	["D", "E"],

	// Middle
	["H", "Y"],
	["F", "L"],
	["J", "P"],
	["N", "V"],

	// Bottom
	["Z", "K"],
	["R", "O"],
	["S", "U"],
	["T", "G"],
];

var currentLetter;

function onClickCubelet(index) {
	var letter;
	if (index == 0) letter = cubelet0.getAttribute("data-letter");
	else if (index == 1) letter = cubelet1.getAttribute("data-letter");
	console.log("Clicked: " + letter + " (" + getLetterColor(letter) + ")");

	if (letter === currentLetter) console.log("Correct!");
	else console.log("Wrong!");

	resetTest();
}

function resetTest() {
	console.log("Resetting test...");

	var randomLetterIndex;
	var randomLetter;
	do {
		randomLetterIndex = Math.floor(Math.random() * (letters.length + 1));
		randomLetter = letters.charAt(randomLetterIndex);
	} while (randomLetter === currentLetter);
	currentLetter = randomLetter;
	
	letter.innerHTML = currentLetter;
	console.log("Letter: " + currentLetter);

	var i;
	var j;
	loop: for (i = 0; i < edgePairs.length; i++) {
		for (j = 0; j < edgePairs[i].length; j++) {
			if (edgePairs[i][j] == randomLetter) {
				break loop;
			}
		}
	}

	var letter0 = edgePairs[i][j];
	var letter1 = edgePairs[i][1 - j];
	var color0 = getLetterColor(letter0);
	var color1 = getLetterColor(letter1);
	
	cubelet0.style.backgroundColor = getPrettyColor(color0);
	cubelet1.style.backgroundColor = getPrettyColor(color1);

	cubelet0.setAttribute("data-letter", letter0);
	cubelet1.setAttribute("data-letter", letter1);

	console.log("Test reset");
}

function getLetterColor(letter) {
	var index = letters.indexOf(letter);
	var color = colors[Math.floor(index / 4)];
	return color;
}

function getPrettyColor(color) {
	switch (color) {
		case "yellow": return "rgb(245, 237, 79)";
		case "red": return "rgb(215, 57, 33)";
		case "green": return "rgb(122, 223, 67)";
		case "orange": return "rgb(230, 150, 54)";
		case "white": return "rgb(255, 255, 255)";
		case "blue": return "rgb(117, 176, 222)";
	}
}