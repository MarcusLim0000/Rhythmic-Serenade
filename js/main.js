const fallingSpeed = 5; // Adjust as needed
const updateInterval = 5; // Adjust as needed

//declare arrays of 1s and 0s, 1 indicating to release a note, 0 to abstain. total beats will be 210
const noteW = [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1]
const noteE = [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1]
const noteR = [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1]
const noteI = [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1]
const noteO = [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1]
const noteP = [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1]

// bpm in milliseconds: 428.571
const interval = 1000;

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

let elapsedTime = 0;

let hitCount = 0;
let missCount = 0;

//function to start game and create notes

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
    // Set a timeout to process the next item after the delay
    setTimeout(function () {
      startGame(index + 1);
    }, interval);
  }
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
  // Parse the transform matrix to get the translateY value
  let translateY = parseInt(transform.split(',')[5])

  // Check if the falling object's position is at the desired translateY value, note is true, and keyPressed is true
  if (translateY >= 550 && translateY <= 650 && keyPressed === true) {
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

//start button function

const startButton = document.getElementById('startButton');
let startTime = 0;

// Add a click event listener to the button
startButton.addEventListener('click', function () {
  // Code to be executed when the button is clicked.

  //resetting miss and hit counts
  hitCount = 0;
  missCount = 0;
  document.querySelector('#hit_count').innerText = `${hitCount}`;
  document.querySelector('#miss_count').innerText = `${missCount}`;
  //start game again
  startGame(0);

  // Reset startTime to 0 when the button is clicked again
  startTime = 0;

  updateElapsedTime();

  // Set the start time only if it's the first time or after clearing         
  if (!startTime) {
    startTime = new Date().getTime();
    // Start updating elapsed time
    setInterval(updateElapsedTime, 1000);
  }
  audio.pause();
  audio.currentTime = 0;
  audio.play();
});