import React, { useState, useEffect } from 'react';
import HttpClient from '../common/HttpClient';
import AddEventPage from '../events/AddEventPage';

const EditEventPage = () => {
    const [event, updateEvent] = useState<any>("");
    const [callDone, flipBoolean] = useState<Boolean>(false);
    var eventId = window.location.search;
    eventId = eventId.substr(1);
    useEffect(() => { fetchEvent(eventId) }, [])
    // eee29dcd-d75a-4522-b207-4f284d2d8641

    async function fetchEvent(testUrl: string) {
        const request = new HttpClient("https://localhost:44306/events/");
        let answer = await request.get(eventId).then(
            function (data: any) {
                return data.json();
            }
        ).catch(error => console.log(error));
        console.log(answer);
        updateEvent(answer);
    }

    return (
        <div>
            <AddEventPage />
            <h1>{event.name}</h1>
            <h1>{event.description}</h1>
            <h1>{event.startDate}</h1>
        </div>
    );
}

export default EditEventPage