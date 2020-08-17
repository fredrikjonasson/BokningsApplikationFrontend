import React, { useState, useEffect } from 'react';
import HttpClient from '../common/HttpClient';
import EditEventForm from '../events/EditEventForm';
import EventService from '../services/EventService';

const eventService = new EventService(new HttpClient("https://localhost:44306/events/"));
interface EventInvitation {
    id: string;
    EventId: string;
    email: string;
    invitationStatus: number;
}
interface Event {
    sentInvitations: EventInvitation[];
    id: string;
    name: string;
    description: string;
    email: string;
    startDate: string;
}
const EditEventPage = () => {
    const [eventObject, setEventObject] = useState<Event>()

    useEffect(() => {
        async function fetchEvent(eventId: string) {
            let answer = await eventService.FetchEvent(eventId).then(
                function (data: any) {
                    return data.json();
                }
            ).catch(error => console.log(error));
            setEventObject(answer as Event);
        }

        var eventId = window.location.search;
        eventId = eventId.substr(1);
        fetchEvent(eventId);
    }, []);

    const handleSubmit = (event: any) => {
        event.preventDefault();
        var formObject = Object.fromEntries(new FormData(event.target));

        if (eventObject) {
            var dto = {
                Id: eventObject.id,
                Name: eventObject.name,
                Description: eventObject.description,
                StartDate: moment.utc(`${formObject.startDate} ${formObject.startTime}`),
                SentInvitations: eventObject.sentInvitations
            }
            eventService.EditEvent(dto, eventObject.id);

        }
    }


    if (!eventObject) {
        return (
            <div>
                <h1>Error! Could not fetch requested event</h1>
            </div>
        )
    } else {
        return (
            <div>
                <EditEventForm event={eventObject} />
            </div>
        );

    }
}

export default EditEventPage