const fallingSpeed = 32; // Adjust as needed
const fallingInterval = 50; // Adjust as needed

//declare arrays of 1s and 0s, 1 indicating to release a note, 0 to abstain.
const noteW = [1]
const noteE = [1]
const noteR = [1]
const noteI = [1]
const noteO = [1]
const noteP = [1]

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
let noteSpeed;
let intervalId;

let elapsedTime = 0;

//function to start game and create notes

function startGame() {
  let intervalId;
  let i = 0;

  // Function to iterate through the array to determine if a note has to be dropped.
    if (i < noteW.length) {
      if (noteW[i] === 1) {
        createFallingNoteW();
      }
      if (noteE[i] === 1) {
        createFallingNoteE();
      }
      if (noteR[i] === 1) {
        createFallingNoteR();
      }
      if (noteI[i] === 1) {
        createFallingNoteI();
      }
      if (noteO[i] === 1) {
        createFallingNoteO();
      }
      if (noteP[i] === 1) {
        createFallingNoteP();
      }

      i++;
    } else {
      clearInterval(intervalId); // Clear the interval when the last index is reached
    }
  }



// Call the notes function to start the process

// Function to update elapsed time
function updateElapsedTime() {
  const currentTime = new Date().getTime();
  elapsedTime = Math.floor((currentTime - startTime) / 1000);
  document.querySelector('.elapsed_Time').innerText = `Elapsed Time: ${elapsedTime} seconds`;
}


////////////////////////////////////////////
//functions to drop notes on individual columns

function createFallingNoteW() {
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
          position = 0;
      }
  }

  noteSpeed = setInterval(updatePosition, fallingInterval);
}

function createFallingNoteE() {
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
          position = 0;
      }
  }

  noteSpeed = setInterval(updatePosition, fallingInterval);
}

function createFallingNoteR() {
  fallingObject = document.createElement("div");
  fallingObject.classList.add("falling-object");

  const image = document.createElement("img");
  image.src = "./assets/note.jpg";
  fallingObject.appendChild(image);

  let position = 0;

  columns.colR.appendChild(fallingObject);

  function updatePosition() {
      position += fallingSpeed;
      fallingObject.style.transform = `translateY(${position}px)`;

      if (position > columns.colR.clientHeight) {
          position = 0;
      }
  }

  noteSpeed = setInterval(updatePosition, fallingInterval);
}

function createFallingNoteI() {
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
          position = 0;
      }
  }

  noteSpeed = setInterval(updatePosition, fallingInterval);
}

function createFallingNoteO() {
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
          position = 0;
      }
  }

  noteSpeed = setInterval(updatePosition, fallingInterval);
}

function createFallingNoteP() {
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
          position = 0;
      }
  }

  noteSpeed = setInterval(updatePosition, fallingInterval);
}

////////////////////////////////

// Function to clear the falling object
function clearFallingNote() {
  if (fallingObject) {
      fallingObject.remove();
      clearInterval(noteSpeed);
      const audio = document.getElementById('myAudio');
      audio.pause();
      audio.currentTime = 0;
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
        startGame();

            // Reset startTime to null when the button is clicked again
        startTime = null;

        // Set the start time only if it's the first time or after clearing         
        if (!startTime) {
            startTime = new Date().getTime();
            // Start updating elapsed time
            setInterval(updateElapsedTime, 1000);
        }
        audio.play();
  });
