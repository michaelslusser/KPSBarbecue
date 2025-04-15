"use strict";
$(document).ready( () => {
    // get event data as json
    $.ajax({
        url: "https://www.googleapis.com/calendar/v3/calendars/lu907aos05d216dh91v24ki9so@group.calendar.google.com/events",
        type: "GET",
        dataType: "json",
        data: {
            key: "AIzaSyD0oWBBBiD4j1-7vVX7zg3wvkrVR4VtNcc",
            calendarId: "lu907aos05d216dh91v24ki9so@group.calendar.google.com",
            orderBy: "startTime",
            maxResults: "5",
            singleEvents: true,
            timeMin: new Date().toISOString()
        }
    }).done( (data) => {
        // the container we want to store the events in
        const container = $("#from-calendar");
        console.log("everything is working");
        console.log(data);

        // one by one, create a block for each event
        $.each(data.items, function(i, item) {
            let start =  new Date(item.start.dateTime);
            let end = new Date(item.end.dateTime);
            container.append(
                `<div class="event-item">
                <h4>` + item.summary + `</h4>
                <span><b>Location:</b> ` + item.location + `</span><br>
                <span><b>Start time:</b> ` + start.toDateString() + `, ` + start.toTimeString() + `</span><br>
                <span><b>End time:</b> ` + end.toDateString() + `, ` + end.toTimeString() + `</span><br>
                <a href="` + item.htmlLink + `" target="_blank">More Info</a><br>
                </div>`
            );
        });
    }).fail( (response) => {
        console.log("Request Failed: " + + jqHXR.responseText);
    });
});