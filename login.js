"use strict";
$(document).ready( () => {
    // move focus to text input
    $("#password").focus();

    // handle form validation
    $("form").submit( event => {
        // assume everything is fine
        let isValid = true;

        // validate password
        const correctPassword = "clevelandPROUD";
        const inputPassword = $("#password").val().trim();
        if (inputPassword == "") {
            $("#password").next().text("This field is required.");
            isValid = false;
        } else if (inputPassword !== correctPassword) {
            $("#password").next().text("Invalid password.");
            isValid = false;
        }

        if (!isValid) {
            event.preventDefault();
        }
    });
});