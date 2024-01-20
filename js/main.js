const fallingSpeed = 30; // Adjust as needed
const updateInterval = 30; // Adjust as needed

//declare arrays of 1s and 0s, 1 indicating to release a note, 0 to abstain. total beats will be 210
const noteW = [1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1]
const noteE = [0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1]
const noteR = [1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1]
const noteI = [0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1]
const noteO = [1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1]
const noteP = [0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1]

// bpm in milliseconds: 428.571
const interval = 428.571;

//declaring state of columns

const columns = {
  'colW': document.getElementById("colW"),
  'colE': document.getElementById("colE"),
  'colR': document.getElementById("colR"),
  'colI': document.getElementById("colI"),
  'colO': document.getElementById("colO"),
  'colP': document.getElementById("colP"),
};

const originalColor = columns.colW.style.backgroundColor;

//other declarations

let fallingObject;
let score = 0;
let miss = 0;
let audio = document.getElementById('myAudio');
let intervalId;

let elapsedTime = 0;

//function to start game and create notes

function startGame(index) {
  if (noteW[index] === 1) {
    createFallingNoteW();
  }
  if (noteE[index] === 1) {
    createFallingNoteE();
  }
  if (noteR[index] === 1) {
    createFallingNoteR();
  }
  if (noteI[index] === 1) {
    createFallingNoteI();
  }
  if (noteO[index] === 1) {
    createFallingNoteO();
  }
  if (noteP[index] === 1) {
    createFallingNoteP();
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


////////////////////////////////////////////
//functions to drop notes on individual columns

function createFallingNoteW() {
    let noteSpeed;
  fallingObject = document.createElement("div");
  fallingObject.classList.add("falling-object");

  const image = document.createElement("img");
  image.src = "./assets/note.jpg";
  fallingObject.appendChild(image);

  let position = 0;

  columns.colW.appendChild(fallingObject);

  function updatePosition() {
      position += fallingSpeed;
      fallingObject.style.transform = `translateY(${position}px)`;

      if (position > columns.colW.clientHeight) {
          clearInterval(noteSpeed);
          fallingObject.remove();
      }
  }
   noteSpeed = setInterval(updatePosition, updateInterval);
}

function createFallingNoteE() {
    let noteSpeed;
  fallingObject = document.createElement("div");
  fallingObject.classList.add("falling-object");

  const image = document.createElement("img");
  image.src = "./assets/note.jpg";
  fallingObject.appendChild(image);

  let position = 0;

  columns.colE.appendChild(fallingObject);

  function updatePosition() {
      position += fallingSpeed;
      fallingObject.style.transform = `translateY(${position}px)`;

      if (position > columns.colE.clientHeight) {
        clearInterval(noteSpeed);
        fallingObject.remove();
      }
  }

  noteSpeed = setInterval(updatePosition, updateInterval);
}

function createFallingNoteR() {
    let noteSpeed;
  fallingObject = document.createElement("div");
  fallingObject.classList.add("falling-object");

  const image = document.createElement("img");
  image.src = "./assets/note.jpg";
  fallingObject.appendChild(image);

  let position = 0;

  columns.colR.appendChild(fallingObject);

  function updatePosition() {
      position += fallingSpeed;
      console.log(`Rposition${position}`)
      fallingObject.style.transform = `translateY(${position}px)`;

      if (position > columns.colR.clientHeight) {
        clearInterval(noteSpeed);
        fallingObject.remove();
      }
  }
  noteSpeed = setInterval(updatePosition, updateInterval);
}

function createFallingNoteI() {
    let noteSpeed;
  fallingObject = document.createElement("div");
  fallingObject.classList.add("falling-object");

  const image = document.createElement("img");
  image.src = "./assets/note.jpg";
  fallingObject.appendChild(image);

  let position = 0;

  columns.colI.appendChild(fallingObject);

  function updatePosition() {
      position += fallingSpeed;
      fallingObject.style.transform = `translateY(${position}px)`;

      if (position > columns.colI.clientHeight) {
        clearInterval(noteSpeed);
        fallingObject.remove();
      }
  }

  noteSpeed = setInterval(updatePosition, updateInterval);
}

function createFallingNoteO() {
    let noteSpeed;
  fallingObject = document.createElement("div");
  fallingObject.classList.add("falling-object");

  const image = document.createElement("img");
  image.src = "./assets/note.jpg";
  fallingObject.appendChild(image);

  let position = 0;

  columns.colO.appendChild(fallingObject);

  function updatePosition() {
      position += fallingSpeed;
      fallingObject.style.transform = `translateY(${position}px)`;

      if (position > columns.colO.clientHeight) {
        clearInterval(noteSpeed);
        fallingObject.remove();
      }
  }

  noteSpeed = setInterval(updatePosition, updateInterval);
}

function createFallingNoteP() {
    let noteSpeed;
  fallingObject = document.createElement("div");
  fallingObject.classList.add("falling-object");

  const image = document.createElement("img");
  image.src = "./assets/note.jpg";
  fallingObject.appendChild(image);

  let position = 0;

  columns.colP.appendChild(fallingObject);

  function updatePosition() {
      position += fallingSpeed;
      fallingObject.style.transform = `translateY(${position}px)`;

      if (position > columns.colP.clientHeight) {
        clearInterval(noteSpeed);
        fallingObject.remove();
      }
  }

  noteSpeed = setInterval(updatePosition, updateInterval);
}

////////////////////////////////

// Function to clear the falling object
function clearFallingNote() {
  if (fallingObject) {
      fallingObject.remove();
  }
}

//event listener to change column color event when key is pressed for these elements

function columnColorChange(columnId) {
  const column = columns[columnId];
  const originalColor = column.style.backgroundColor;

  document.body.addEventListener('keydown', function (event) {
      if (event.key.toLowerCase() === columnId.charAt(3).toLowerCase()) {
          column.style.backgroundColor = 'green';
      }
  });

  document.body.addEventListener('keyup', function (event) {
      if (event.key.toLowerCase() === columnId.charAt(3).toLowerCase()) {
          column.style.backgroundColor = originalColor;
      }
  });
}

// Attach event listener to each column
Object.keys(columns).forEach(columnColorChange);

//start button function

let startButton = document.getElementById('startButton');
let startTime;

  // Add a click event listener to the button
  startButton.addEventListener('click', function() {
    // Code to be executed when the button is clicked.
        clearFallingNote();
        updateElapsedTime();
        startGame(0);

            // Reset startTime to null when the button is clicked again
        startTime = 0;

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

  