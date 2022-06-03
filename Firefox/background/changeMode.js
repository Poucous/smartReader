function changeMode() {

    if(localStorage.getItem("state") ===  "enable") {

        localStorage.setItem("state", "disable");

        updateIcon("disable");

    } else if(localStorage.getItem("state") ===  "disable") {

        localStorage.setItem("state", "enable");

        updateIcon("enable");

    }
}