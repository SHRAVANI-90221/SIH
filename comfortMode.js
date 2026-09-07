/* =====================================================
   COMFORT MODE JAVASCRIPT
   CARE & CONNECT
   ===================================================== */


/* ==============================
   GET ELEMENTS
   ============================== */

const comfortToggle =
    document.getElementById("comfortToggle");

const comfortStatus =
    document.getElementById("comfortStatus");


/* ==============================
   APPLY COMFORT MODE
   ============================== */

function applyComfortMode(isOn) {

    if (isOn) {

        document.body.classList.add(
            "comfort-active"
        );

        comfortStatus.textContent = "ON";

        comfortStatus.style.color =
            "#16852b";

        localStorage.setItem(
            "comfortMode",
            "on"
        );

    } else {

        document.body.classList.remove(
            "comfort-active"
        );

        comfortStatus.textContent = "OFF";

        comfortStatus.style.color =
            "#777";

        localStorage.setItem(
            "comfortMode",
            "off"
        );
    }
}


/* ==============================
   TOGGLE EVENT
   ============================== */

comfortToggle.addEventListener(
    "change",
    function () {

        applyComfortMode(
            this.checked
        );

    }
);


/* ==============================
   LOAD SAVED SETTING
   ============================== */

function loadComfortMode() {

    const savedMode =
        localStorage.getItem(
            "comfortMode"
        );


    if (savedMode === "on") {

        comfortToggle.checked = true;

        applyComfortMode(true);

    } else {

        comfortToggle.checked = false;

        applyComfortMode(false);
    }
}


/* ==============================
   START ACTIVITY
   ============================== */

function startActivity() {

    const message =
        document.getElementById(
            "messageBox"
        );


    message.textContent =
        "🌟 Great! Your activity is starting. Take your time!";

}


/* ==============================
   QUICK OPTION MESSAGE
   ============================== */

function showMessage(option) {

    const message =
        document.getElementById(
            "messageBox"
        );


    if (option === "Home") {

        message.textContent =
            "🏠 Home selected.";

    }

    else if (option === "Listen") {

        message.textContent =
            "🔊 Listen selected.";

    }

    else if (option === "Play") {

        message.textContent =
            "🎮 Play selected.";

    }

    else if (option === "Memories") {

        message.textContent =
            "🖼️ Memories selected.";
    }
}


/* ==============================
   BACK
   ============================== */

function goBack() {

    if (window.history.length > 1) {

        window.history.back();

    } else {

        alert(
            "This page will connect to the main page later."
        );
    }
}


/* ==============================
   PAGE LOAD
   ============================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        loadComfortMode();

    }
);