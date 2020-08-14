import React, { useState, useEffect } from 'react';
import HttpClient from '../common/HttpClient';
import EditEventForm from '../events/EditEventForm';
import EventService from '../services/EventService';

const eventService = new EventService(new HttpClient("https://localhost:44306/events/"));
interface EventInvitations {
    id: string;
    EventId: string;
    email: string;
    invitationStatus: number;
}
interface Event {
    sentInvitations: EventInvitations[];
    id: string;
    name: string;
    description: string;
    email: string;
    invitationStatus: number;
}
const EditEventPage = () => {
    useEffect(() => {
        async function fetchEvent(eventId: string) {
            let answer = await eventService.FetchEvent(eventId).then(
                function (data: any) {
                    return data.json();
                }
            ).catch(error => console.log(error));
            setEventObject(answer);
        }

        var eventId = window.location.search;
        eventId = eventId.substr(1);
        fetchEvent(eventId);
    }, []);


    const [eventObject, setEventObject] = useState<Event>()
    if (eventObject) {
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