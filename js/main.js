const fallingSpeed = 10; // Adjust as needed
const fallingInterval = 20; // Adjust as needed

const columns = {
    'colW': document.getElementById("colW"),
    'colE': document.getElementById("colE"),
    'colR': document.getElementById("colR"),
    'colI': document.getElementById("colI"),
    'colO': document.getElementById("colO"),
    'colP': document.getElementById("colP"),
};


const originalColor = columns.colW.style.backgroundColor;

let footer;
let fallingObject;
let score = 0;
let miss = 0;
let intervalId;
let audio = document.getElementById('myAudio');

let elapsedTime = 0;

//hard coded array of notes, time to fall in milli seconds based on elapsed time
notesW = [1000,2000,3000,4000,5000]
// notesE = [6,7,8,9,10]
// notesR = [11,12,13,14,15]
// notesI = [16,17,18,19,20]
// notesO = [21,22,23,24,25]
// notesP = [26,27,28,29,30]

// Function to update elapsed time
function updateElapsedTime() {
    const currentTime = new Date().getTime();
    elapsedTime = Math.floor((currentTime - startTime) / 1000);
    document.querySelector('.elapsed_Time').innerText = `Elapsed Time: ${elapsedTime} seconds`;
}

//function to create falling objects

function createFallingObject() {
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

    intervalId = setInterval(updatePosition, fallingInterval);
}

// Function to clear the falling object
function clearFallingObject() {
    if (fallingObject) {
        fallingObject.remove();
        clearInterval(intervalId);
        const audio = document.getElementById('myAudio');
        audio.pause();
        audio.currentTime = 0;
    }
}

// function to track and update score

function updateScore() {
    //code for hit detection
}
//event listener to change column color event when key is pressed for these elements and track score

function handleColumnColorChange(columnId) {
    const column = columns[columnId];
    const originalColor = column.style.backgroundColor;

    document.body.addEventListener('keydown', function (event) {
        if (event.key.toLowerCase() === columnId.charAt(3).toLowerCase()) {
            column.style.backgroundColor = 'green';
            updateScore();
        }
    });

    document.body.addEventListener('keyup', function (event) {
        if (event.key.toLowerCase() === columnId.charAt(3).toLowerCase()) {
            column.style.backgroundColor = originalColor;
        }
    });
}

// Attach event listener to each column
Object.keys(columns).forEach(handleColumnColorChange);


//start button function

let startButton = document.getElementById('startButton');
let startTime;

  // Add a click event listener to the button
  startButton.addEventListener('click', function() {
    // Code to be executed when the button is clicked.
        // Call the function to clear previous and create the falling object
        clearFallingObject();
        createFallingObject();
        updateScore();

            // Reset startTime to null when the button is clicked again
        startTime = null;

        // Set the start time only if it's the first time or after clearing         
        if (!startTime) {
            startTime = new Date().getTime();
            // Start updating elapsed time
            setInterval(updateElapsedTime, 1000);
        }
        
    //play audio
        audio.play();
  });
