var cubelet0 = document.getElementById("cubelet-0");
var cubelet1 = document.getElementById("cubelet-1");
var letter = document.getElementById("letter");
var message = document.getElementById("message");

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
var transitionTimeout;

function onClickCubelet(index) {
	if (transitionTimeout) return;

	var letter;
	if (index == 0) letter = cubelet0.getAttribute("data-letter");
	else if (index == 1) letter = cubelet1.getAttribute("data-letter");
	console.log("Clicked: " + letter + " (" + getLetterColor(letter) + ")");

	var statusMessage;
	var statusColor;
	var statusShadow;
	if (letter === currentLetter) {
		statusMessage = "YES";
		statusColor = "#2ecc71";
		statusShadow = "0px 2px 1px #27ae60";
	} else {
		statusMessage = "NO";
		statusColor = "#e74c3c";
		statusShadow = "0px 2px 1px #c0392b";
	}
	message.innerHTML = statusMessage;
	message.style.color = statusColor;
	message.style.textShadow = statusShadow;

	transitionTimeout = setTimeout(function() {
		message.innerHTML = "";
		message.style.color = "";
		message.style.textShadow = "";
		resetTest();
		transitionTimeout = undefined;
	}, 1000);
}

function resetTest() {
	console.log("Resetting test...");

	var randomLetterIndex;
	var randomLetter;
	do {
		randomLetterIndex = Math.floor(Math.random() * (letters.length - 1));
		randomLetter = letters.charAt(randomLetterIndex);
	} while (randomLetter === currentLetter);
	currentLetter = randomLetter;
	
	letter.innerHTML = currentLetter;
	console.log("Letter: " + currentLetter);

	var i;
	var j;
	loop: for (i = 0; i < edgePairs.length; i++) {
		for (j = 0; j < edgePairs[i].length; j++) {
			if (edgePairs[i][j] === randomLetter) {
				break loop;
			}
		}
	}
	console.log(i + ", " + j);

	var edgeLetters = [edgePairs[i][j], edgePairs[i][1 - j]];

	var index = 0;
	if (Math.random() < 0.5) index = 1;
	
	cubelet0.style.backgroundColor = getPrettyColor(getLetterColor(edgeLetters[index]));
	cubelet1.style.backgroundColor = getPrettyColor(getLetterColor(edgeLetters[1 - index]));
	cubelet0.setAttribute("data-letter", edgeLetters[index]);
	cubelet1.setAttribute("data-letter", edgeLetters[1 - index]);

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