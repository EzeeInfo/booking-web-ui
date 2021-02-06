"use strict";
window.onload = function (event) {
    var loginForm = document.querySelector(".form-signin>form");
    loginForm.onsubmit = function (event) {
        event.preventDefault();
        // Where did the event happend
        var form = event.currentTarget;
        // Collect Data from Form
        var userName = form.elements["userName"].value;
        var password = form.elements["password"].value;
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
