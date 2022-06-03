function changeMode() {

    /* Allows the user to disable or enable the addon

    By storing the state on the localStorage

    */

    if(localStorage.getItem("state") ===  "enable") {

        localStorage.setItem("state", "disable");

        updateIcon("disable");

    } else if(localStorage.getItem("state") ===  "disable") {

        localStorage.setItem("state", "enable");

        updateIcon("enable");

    }
}