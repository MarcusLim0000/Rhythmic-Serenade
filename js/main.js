document.addEventListener("DOMContentLoaded", function() {
    const fallingSpeed = 10; // Adjust as needed
    const fallingInterval = 20; // Adjust as needed

    const fallingColumn = document.getElementById("fallingColumn");

    function createFallingObject() {
        const fallingObject = document.createElement("div");
        fallingObject.classList.add("falling-object");

        const image = document.createElement("img");
        image.src = "https://gametora.com/images/umamusume/characters/icons/chr_icon_1068.png"; // Replace with the actual path to your image
        fallingObject.appendChild(image);

        let position = 0;

        fallingColumn.appendChild(fallingObject);

        function updatePosition() {
            position += fallingSpeed;
            fallingObject.style.transform = `translateY(${position}px)`;

            if (position > fallingColumn.clientHeight) {
                position = 0;
            }
        }

        setInterval(updatePosition, fallingInterval);
    }

    // Call the function to create the falling object
    createFallingObject();
});


// declare and cache keys into variables

let keyW = document.getElementById('#w')
let keyE = document.getElementById('#e')
let keyR = document.getElementById('#r')
let keyI = document.getElementById('#i')
let keyO = document.getElementById('#o')
let keyP = document.getElementById('#p')

//event listener to declare keydown event for these elements

document.body.addEventListener('keydown', function(event) {
    //check if key pressed is the correct key
    if(event.key === 'w') {
        //code to change the column 'w' in order to indicate button pressed
    }
});

//start button function

let startButton = document.getElementById('startButton');

  // Add a click event listener to the button
  startButton.addEventListener('click', function() {
    // Code to be executed when the button is clicked.
    // You can replace the alert with your own logic to start something
  });


// how to check set time interval for javascript