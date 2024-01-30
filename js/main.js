import { noteWarray,noteOarray,noteEarray,noteIarray,noteRarray,noteParray } from "./arrayOfNotes.js";

const fallingSpeed = 5; // Adjust as needed/ how much the notes move per pixels
const updateInterval = 3; // Adjust as needed/ how fast the function increments the pixels per note

//declare arrays of 1s and 0s in a separate file, 1 indicating to release a note, 0 to abstain. total beats will be 210

const noteW = noteWarray
const noteE = noteEarray
const noteR = noteRarray
const noteI = noteIarray
const noteO = noteOarray
const noteP = noteParray

// bpm in milliseconds: 461.54
const interval = 461.54;

//declaring state of columns

const columns = {
  'colW': document.getElementById("colW"),
  'colE': document.getElementById("colE"),
  'colR': document.getElementById("colR"),
  'colI': document.getElementById("colI"),
  'colO': document.getElementById("colO"),
  'colP': document.getElementById("colP"),
};

// //other declarations
let audio = document.getElementById('myAudio');

let timer = 0
let elapsedTime = 0;

let hitCount = 0;
let missCount = 0;

//function to start game

function startGame(index) {
  if (noteW[index] === 1) {
    createFallingNote('colW');
  }
  if (noteE[index] === 1) {
    createFallingNote('colE');
  }
  if (noteR[index] === 1) {
    createFallingNote('colR');
  }
  if (noteI[index] === 1) {
    createFallingNote('colI');
  }
  if (noteO[index] === 1) {
    createFallingNote('colO');
  }
  if (noteP[index] === 1) {
    createFallingNote('colP');
  }

  // Check if there are more items to process
  if (index < noteW.length - 1) {
    // Set a timeout to process the next index in the array after the delay
    setTimeout(function () {
      startGame(index + 1);
    }, interval);
  }
  hitJudge()
}

// Function to update elapsed time
function updateElapsedTime() {
  const currentTime = new Date().getTime();
  elapsedTime = Math.floor((currentTime - startTime) / 1000);
  document.querySelector('.elapsed_Time').innerText = `Elapsed Time: ${elapsedTime} seconds`;
}

//functions to drop notes on individual columns

function createFallingNote(columnId) {
  let noteSpeed;
  let fallingObject = document.createElement("div");
  fallingObject.classList.add("falling-object");

  const image = document.createElement("img");
  image.src = "./assets/note.jpg";
  fallingObject.appendChild(image);

  let position = 0;

  const column = columns[columnId];
  column.appendChild(fallingObject);

  function updatePosition() {
    position += fallingSpeed;
    fallingObject.style.transform = `translateY(${position}px)`;

    if (position > column.clientHeight) {
      clearInterval(noteSpeed);
      fallingObject.remove();
    }
  }

  noteSpeed = setInterval(updatePosition, updateInterval);
}

// Function to detect hit
function hitJudge(keyPressed) {
  // Check if a note element is present
  let note = document.querySelector('.falling-object');

  // Get the computed style of the falling object
  let transform = window.getComputedStyle(note).transform;
  // Parse the transform matrix to get the translateY value, the note position's Y value is at the 5th index of matrix
  let translateY = parseInt(transform.split(',')[5])

  // Check if the falling object's position is at the desired translateY range and keyPressed is true, increase range for easier difficulty.
  //range must be modified if the columns px height change due to size changes in devices display screens/viewport. now modified for 350px columns, 1980x1080 resolution displays.
  if (translateY >= 250 && translateY <= 350 && keyPressed === true) {
    hitCount ++;
    document.querySelector('#hit_count').innerText = `${hitCount}`;
  } else {
    missCount ++;
    document.querySelector('#miss_count').innerText = `${missCount}`;
  }
}

//event listener to change column color event when key is pressed for these elements
function columnColorChange(columnId) {
  const column = columns[columnId];
  const originalColor = column.style.backgroundColor;
  let keyPressed = false;

  document.body.addEventListener('keydown', function (event) {
    if (event.key.toLowerCase() === columnId.charAt(3).toLowerCase()) {
      column.style.backgroundColor = 'green';
      keyPressed = true;
      hitJudge(keyPressed)
    }
  });

  document.body.addEventListener('keyup', function (event) {
    if (event.key.toLowerCase() === columnId.charAt(3).toLowerCase()) {
      column.style.backgroundColor = originalColor;
      keyPressed = false;
    }
  });
}

// Attach event listener to each column
Object.keys(columns).forEach(columnColorChange);

//function to show win/lose message

function displayResult(){

    const resultSection = document.querySelector('.result');

    const winMessage = document.createElement('h2')
    winMessage.classList.add('win_Message');
    winMessage.textContent = 'WAAAAA TOO PRO! But so tryhard. :D';

    const loseMessage = document.createElement('h2')
    loseMessage.classList.add('lose_Message');
    loseMessage.textContent = 'Skill issue. Git Gud!';
        
    if (hitCount >= 49){
        resultSection.appendChild(winMessage)
    }else{
        resultSection.appendChild(loseMessage)
    }
}

//function to count time separately to display win/lose message

function scoreCountdown (){
    const intervalId = setInterval(function(){
        timer++;
        if (timer === 90){
            clearInterval(intervalId);
            displayResult();
        }
    },1000)
}

//start button function

const startButton = document.getElementById('startButton');
let startTime = 0;

// Add a click event listener to the button

startButton.addEventListener('click', function () {
  // Code to be executed when the button is clicked, events must be in order.

  timer = 0;

  //resetting miss and hit counts
  hitCount = 0;
  missCount = 0;
  document.querySelector('#hit_count').innerText = `${hitCount}`;
  document.querySelector('#miss_count').innerText = `${missCount}`;

    // Remove the last appended score message element
    const resultSection = document.querySelector('.result');
    const lastChild = resultSection.lastChild;
  
    if (lastChild) {
      resultSection.removeChild(lastChild);
    }
  //start game again
  startGame(0);

  // Reset startTime to 0 when the button is clicked again
  startTime = 0;

  // Set the start time only if it's the first time or after clearing         
  if (!startTime) {
    startTime = new Date().getTime();
    // Start updating elapsed time
    setInterval(updateElapsedTime, 1000);
  }
  
  updateElapsedTime();
  scoreCountdown();
  //reset song
  audio.pause();
  audio.currentTime = 0;
  audio.play();
});