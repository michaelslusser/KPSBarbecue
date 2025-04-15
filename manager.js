"use strict";
var eventJSON = {};
function getFormInfoJSON() {
    // get start and end times based on form
    let startTime = $("#start-time").val();
    let endTime = $("#end-time").val();
    let maxResults = $("#max-results").val();
    console.log(startTime);
    console.log(endTime);

    $.ajax({
        url: "https://www.googleapis.com/calendar/v3/calendars/lu907aos05d216dh91v24ki9so@group.calendar.google.com/events",
        type: "GET",
        dataType: "json",
        data: {
            key: "AIzaSyD0oWBBBiD4j1-7vVX7zg3wvkrVR4VtNcc",
            calendarId: "lu907aos05d216dh91v24ki9so@group.calendar.google.com",
            orderBy: "startTime",
            maxResults: maxResults,
            singleEvents: true,
            timeMin: startTime,
            timeMax: endTime
        }
    }).done( (data) => {
        // the container we want to store the events in
        const container = $("#from-calendar");
        let html = "";
        console.log("everything is working");
        console.log(data);

        // one by one, create a block for each event
        $.each(data.items, function(i, item) {
            let start =  new Date(item.start.dateTime);
            let end = new Date(item.end.dateTime);
            html +=
                `<div class="event-item">
                <h4>` + item.summary + `</h4>
                <span><b>Location:</b> ` + item.location + `</span><br>
                <span><b>Start time:</b> ` + start.toDateString() + `, ` + start.toTimeString() + `</span><br>
                <span><b>End time:</b> ` + end.toDateString() + `, ` + end.toTimeString() + `</span><br>
                <a href="` + item.htmlLink + `" target="_blank">More Info</a><br>
                </div>`;
        });
        container.html(html);
    }).fail( (jqHXR, textStatus) => {
        console.log("Request Failed: " + + jqHXR.responseText);
    });
}

$(document).ready( () => {
    // get responses from form and retrieve events
    $("#submit").on("click", getFormInfoJSON);
});