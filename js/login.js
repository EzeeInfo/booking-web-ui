"use strict";
window.onload = (event) => {
    const loginForm = document.querySelector(".form-signin>form");
    loginForm.onsubmit = function (event) {
        event.preventDefault();
        // Where did the event happend
        const form = event.currentTarget;
        // Collect Data from Form
        const userName = form.elements["userName"].value;
        const password = form.elements["password"].value;
        // Perform Logic
        if (userName == "user" && password == "password") {
            window.location.href = '/';
        }
        else {
            alert("Invalid User");
        }
        return false;
    };
};
