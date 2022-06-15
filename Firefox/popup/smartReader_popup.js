var button = document.getElementById("state_img");

function resetButton() {

    browser.runtime.sendMessage({mode: "state"}, function(message) {

        if(message.mode === "enable") {
    
            button.src="img/button_on.png";
    
        } else {
    
            button.src="img/button_off.png";
        }
    });
}

function changeMode() {

    browser.runtime.sendMessage({changeMode: "yep"}, function(message) {

        if(message.state === "done") {

            resetButton();
        }
    });
}

button.addEventListener("click", changeMode);

resetButton();