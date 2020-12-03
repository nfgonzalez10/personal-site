import _ from "lodash";
import "../css/style.scss";
import headerHTML from "../components/header.html";
import mainHTML from "../components/main.html";
const greetText = "Hi! I'm Nicolas";
let globalText = "";

function component() {
	const element = document.createElement("div");

	// Lodash, currently included via a script, is required for this line to work
	element.innerHTML = _.join(["Hello", "webpack", "hola todos"], " ");

	return element;
}

// document.body.appendChild(component());
const root = document.getElementById("root");
root.innerHTML = headerHTML + mainHTML;

// Initialising the canvas
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

// Setting the width and height of the canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Setting up the letters
let letters =
	"ABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZ";
letters = letters.split("");
let flagTime = false;

// Setting up the columns
const fontSize = 10,
	columns = canvas.width / fontSize;

// Setting up the drops
const drops = [];
for (let i = 0; i < columns; i++) {
	drops[i] = 1;
}

// Setting up the draw function
function draw() {
	ctx.fillStyle = "rgba(0, 0, 0, .1)";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	for (let i = 0; i < drops.length; i++) {
		const text = letters[Math.floor(Math.random() * letters.length)];
		ctx.fillStyle = "#0f0";
		ctx.fillText(text, i * fontSize, drops[i] * fontSize);
		drops[i]++;
		if (
			drops[i] * fontSize > canvas.height &&
			Math.random() > 0.95 &&
			!flagTime
		) {
			drops[i] = 0;
		}
	}
}

// Loop the animation
const intervalMatrix = setInterval(draw, 33);

setTimeout(() => {
	flagTime = true;
	setTimeout(() => {
		clearInterval(intervalMatrix);
		const canvasElement = document.getElementById("canvas");
		canvasElement.remove();
		const mainBlock = createMainBlock();
		root.innerHTML += mainBlock.outerHTML;
		writeInTerminal();
	}, 3000);
}, 6000);

function createMainBlock() {
	const mainBlock = document.createElement("div");
	mainBlock.classList.add("main-block");
	mainBlock.setAttribute("id", "main-block");
	return mainBlock;
}
function writeInTerminal() {
	console.log(root);
	const arrayText = greetText.split("");
	arrayText.forEach((letter, indexLetter) => {
		setTimeout(() => {
			const childNode = root.childNodes[2];
			root.removeChild(childNode);
			console.log(root.outerHTML);
			const mainBlock = createMainBlock();
			globalText += letter;
			const text = document.createTextNode(globalText);
			mainBlock.appendChild(text);
			root.innerHTML += mainBlock.outerHTML;
		}, 200 * indexLetter);
	});
}
