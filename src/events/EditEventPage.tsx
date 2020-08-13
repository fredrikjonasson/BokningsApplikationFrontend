import React, { useState, useEffect } from 'react';
import HttpClient from '../common/HttpClient';
import EditEventForm from '../events/EditEventForm';

const EditEventPage = () => {
    useEffect(() => {
        async function fetchEvent(testUrl: string) {
            const request = new HttpClient("https://localhost:44306/events/");
            let answer = await request.get(eventId).then(
                function (data: any) {
                    return data.json();
                }
            ).catch(error => console.log(error));
            updateEvent(answer);
        }
        var eventId = window.location.search;
        eventId = eventId.substr(1);
        fetchEvent(eventId)
    }, [])

    const [event, updateEvent] = useState<any>("");
    // eee29dcd-d75a-4522-b207-4f284d2d8641
    if (event == "") {
        return (
            <div></div>
        )
    } else {
        return (
            <div>
                <EditEventForm event={event} />
            </div>
        );

    }
}

export default EditEventPage