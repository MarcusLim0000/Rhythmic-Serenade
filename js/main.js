const fallingSpeed = 10; // Adjust as needed
const fallingInterval = 20; // Adjust as needed

let fallingColumn = document.getElementById("colW");
const originalColor = fallingColumn.style.backgroundColor; // Store the original color

const columns = {
    'colW': document.getElementById("colW"),
    'colE': document.getElementById("colE"),
    'colR': document.getElementById("colR"),
    'colI': document.getElementById("colI"),
    'colO': document.getElementById("colO"),
    'colP': document.getElementById("colP"),
};

let footer;
let fallingObject;
let score = 0;

//function to create falling objects

function createFallingObject() {
    fallingObject = document.createElement("div");
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

// function to track and update score

function updateScore() {
    if (
        fallingObject &&
        footer &&
        fallingObject.offsetTop + fallingObject.offsetHeight >= footer.offsetTop &&
        fallingObject.offsetTop <= footer.offsetTop + footer.offsetHeight &&
        fallingColumn.style.backgroundColor === 'green'
    ) {
        score++;
        
        document.getElementById('hit_count').innerText = `Score: ${score}`;
    }
}
//event listener to change column color event when key is pressed for these elements and track score

function handleColumnColorChange(columnId) {
    const column = columns[columnId];
    const originalColor = column.style.backgroundColor;

    document.body.addEventListener('keydown', function (event) {
        if (event.key.toLowerCase() === columnId.charAt(3).toLowerCase()) {
            // Change the color when the corresponding key is pressed
            column.style.backgroundColor = 'green';
            updateScore();
        }
    });

    document.body.addEventListener('keyup', function (event) {
        if (event.key.toLowerCase() === columnId.charAt(3).toLowerCase()) {
            // Revert the color when the key is released
            column.style.backgroundColor = originalColor;
        }
    });
}

// Attach event listener to each column
Object.keys(columns).forEach(handleColumnColorChange);


//start button function

let startButton = document.getElementById('startButton');

  // Add a click event listener to the button
  startButton.addEventListener('click', function() {
    // Code to be executed when the button is clicked.
        // Call the function to create the falling object
        createFallingObject();
        updateScore();
    
    // You can replace the alert with your own logic to start something
  });


// how to check set time interval for javascript