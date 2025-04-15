"use strict";
$(document).ready( () => {

    // radio buttons to jQuery UI checkboxradio
    $("input[type=radio]").checkboxradio({
        icon: false
    });

    // focus on form
    $("#contact-form").focus();

    // provide email suggestions for correcting typos using mailcheck
    $("#email").on('blur', function() {
        $(this).mailcheck({
            domains: ['gmail.com', 'bing.com', 'aol.com','yahoo.com'],
            secondLevelDomains: ['hotmail'],
            topLevelDomains: ['com', 'net', 'org'],
            suggested: function(element, suggestion) {
                $("#email").next().text("Did you mean: " + suggestion.full);
            },
            empty: function() {
                $("#email").next().text("");
            }
        });
    });

    // register changes in radio buttons at top of form
    $("input[type=radio]").change( () => {
        // get the checked radio button
        const checked = $("input[type=radio]:checked").val(); 
        const eventContainer = $("#event-container");
        const contactContainer = $("#contact-container");

        if (contactContainer.attr("hidden")) {
            contactContainer.fadeIn();
            // allow message height to change using autosize
            $("#message").autosize();
        }
        if (checked == "contact") {
            // finish current animations
            eventContainer.finish();
            contactContainer.finish();

            // animate content
            eventContainer.fadeOut();
            
        } else {
            // finish current animations
            eventContainer.finish();
            contactContainer.finish();

            // animate content
            eventContainer.fadeIn();
        }
    });

    // handle form submission
    $("#contact-form").submit( event => {
        // assume form is valid
        let isValid = true;

        // if contact was selected supply N/A for the proper fields
        if ($("input[name=type]:checked").val() == "contact") {
            $("#group-name").val("N/A");
            $("#event-name").val("N/A");
            $("#event-location").val("N/A");
        }

        // validate name
        const namePattern = /\w\w+/;
        const firstInput = $("#first-name").val().trim();
        const lastInput = $("#last-name").val().trim();

        if (firstInput == "" || lastInput == "") {
            if (firstInput == "") {
                $("#first-name").next().text("This field is required.");
            }
            if (lastInput == "") {
                $("#last-name").next().text("This field is required.");
            }
            isValid = false;
        } else if (!namePattern.test(firstInput) || !namePattern.test(lastInput)) {
            if (!namePattern.test(firstInput)) {
                $("#first-name").next().text("Must be a valid first name.");
            }
            if (!namePattern.test(lastInput)) {
                $("#last-name").next().text("Must be a valid last name.");
            }
            isValid = false;
        } else {
            $("#first-name").next().text("");
            $("#last-name").next().text("");
        }
        $("#first-name").val(firstInput);
        $("#last-name").val(lastInput);

        // validate email
        const emailPattern = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}\b/;
        const emailInput = $("#email").val().trim();

        if (emailInput == "") { 
            $("#email").next().text("This field is required.");
            isValid = false;
        } else if ( !emailPattern.test(emailInput) ) {
            $("#email").next().text("Must be a valid email address.");
            isValid = false;
        } else {
            $("#email").next().text("");
        }
        $("#email").val(emailInput);

        // validate phone #
        const phonePattern = /^[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4}$/;
        const phoneInput = $("#phone").val().trim();

        if (phoneInput == "") {
            $("#phone").next().text("");
        } else if (!phonePattern.test(phoneInput)) {
            $("#phone").next().text("Must be a valid U.S. phone number.");
            isValid = false;
        } else {
            $("#phone").next().text("");
        }
        $("#phone").val(phoneInput);

        // message validation
        const messageInput = $("#message").val().trim();

        if (messageInput == "") {
            $("#message").next().text("This field is required.");
            isValid = false;
        } else {
            $("#message").next().text("");
        }

        // validate event information
        if ($("input[name=type]:checked").val() == "event-info") {
            // group name validation
            const groupInput = $("#group-name").val().trim();

            if (groupInput == "") {
                $("#group-name").next().text("This field is required.");
                isValid = false;
            } else {
                $("#group-name").next().text("");
            }

            // event name validation
            const eventInput = $("#event-name").val().trim();

            if (eventInput == "") {
                $("#event-name").next().text("This field is required.");
                isValid = false;
            } else {
                $("#event-name").next().text("");
            }

            // event location validation
            const locationInput = $("#event-location").val().trim();

            if (locationInput == "") {
                $("#event-location").next().text("This field is required.");
                isValid = false;
            } else {
                $("#event-location").next().text("");
            }

            // date validation
            const dateInput = $("#event-date").val().trim();
            const datePattern = /^\d{4}\-\d{2}\-\d{2}$/;

            if (dateInput == "") {
                $("#event-date").next().text("This field is required.");
                isValid = false;
            } else if (!datePattern.test(dateInput)) {
                $("#event-date").next().text("Must be a valid date.");
                isValid = false;
            } else {
                $("#event-date").next().text("");
            }
            $("#event-date").val(dateInput);

            // time validation
            const timePattern = /^\d{2}\:\d{2}$/;
            const startInput = $("#start-time").val().trim();
            const endInput = $("#end-time").val().trim();

            if (startInput == "" || endInput == "") {
                if (startInput == "") {
                    $("#start-time").next().text("This field is required.");
                }
                if (endInput == "") {
                    $("#end-time").next().text("This field is required.");
                }
                isValid = false;
            } else if (!timePattern.test(startInput) || !timePattern.test(endInput)) {
                if (!timePattern.test(startInput)) {
                    $("#start-time").next().text("Must be a valid time.");
                }
                if (!timePattern.test(endInput)) {
                    $("#end-time").next().text("Must be a valid time.");
                }
                isValid = false;
            } else {
                $("#start-time").next().text("");
                $("#end-time").next().text("");
            }
        }

        // cancel default action if invalid
        if (!isValid) {
            event.preventDefault();
        }
    });
});