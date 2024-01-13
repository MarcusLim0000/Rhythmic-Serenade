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