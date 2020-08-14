import React, { useState, useEffect } from 'react'
import './EventsPage.css';
import HttpClient from '../common/HttpClient';
import EventService from '../services/EventService';
import moment from 'moment';
import EditEventPage from './EditEventPage';
import { stringify } from 'querystring';
import EditAndListInvites from '../participants/EditAndListInvites';

const eventService = new EventService(new HttpClient("https://localhost:44306"))
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
const EditEventForm = (props: any) => {

    const [eventObject, setEventObject] = useState<Event>()
    const [eventName, setEventName] = useState<string>()
    const [eventDescription, setEventDescription] = useState<string>()
    const [eventInvitations, setEventInvitations] = useState<EventInvitations[]>()

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

    useEffect(() => {
        if (eventObject) {
            setEventName(eventObject.name);
            setEventDescription(eventObject.description);
        } else {
            alert("Error has occured in EditEventFormComponent");
        }
    }, [eventObject]);

    useEffect(() => {
        if (eventName && eventObject) {
            let tempObject = eventObject;
            tempObject.name = eventName;
            setEventObject(tempObject);
        }
        if (eventDescription && eventObject) {
            let tempObject = eventObject;
            tempObject.description = eventDescription;
            setEventObject(tempObject);
        }
        if (eventInvitations && eventObject) {
            let tempObject = eventObject;
            tempObject.sentInvitations = eventInvitations;
            setEventObject(tempObject);
        }
    }, [eventName] || [eventDescription] || eventInvitations);

    useEffect(() => {
        setEventObject(props.event);
    }, []);

    // Tid
    let prefilledStartTime = props.event.startDate.substr(11, 5);
    // Datum
    let prefilledStartDate = props.event.startDate.substr(0, 10);

    let propsDto = {
        handleInvite: (invitations: EventInvitations[]) => {
            setEventInvitations(invitations);
        },
        eventObject: eventObject as Event
    }
    return (
        <div>
            <h2>Redigera event</h2>
            <form className="event-form" onSubmit={handleSubmit} id="event-form-data">
                <input name="name" type="text" value={name} onChange={(e) => setEventName(e.target.value)} placeholder={props.event.name} />
                <textarea form="event-form-data" name="description" value={eventDescription} onChange={(e) => setEventDescription(e.target.value)} placeholder={props.event.description} cols={30} rows={10}></textarea>
                <input name="startDate" type="date" defaultValue={prefilledStartDate} />
                <input name="startTime" type="time" defaultValue={prefilledStartTime} />
                <EditAndListInvites propsDto={propsDto} />
                <button type="submit">Spara redigerat event</button>
            </form>
        </div>
    )
}

export default EditEventForm
