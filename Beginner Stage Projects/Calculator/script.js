const screen = document.getElementById("screen");
const buttons = document.querySelectorAll("button");

function clearScreen(){
    //clear screen
    screen.value = "";
}

function displayError(){
    //display the word error on screen
    screen.value = "error"
}


function append(input){
    //append the clicked button to screen
    screen.value += input;
}

function calculate() {
    try {
        screen.value = eval(screen.value);
    } catch (error) {
        displayError(); // show "error"

        // Disable all buttons
        buttons.forEach(button => {
            button.disabled = true;
        });

        // After 3 seconds, clear screen and enable buttons
        setTimeout(() => {
            screen.value = "";
            buttons.forEach(button => {
                button.disabled = false;
            });
        }, 3000);
    }
}
