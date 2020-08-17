import React, { useState, useEffect } from 'react'
import './EventsPage.css';
import HttpClient from '../common/HttpClient';
import EventService from '../services/EventService';
import moment from 'moment';
import EditEventPage from './EditEventPage';
import { stringify } from 'querystring';
import EditAndListInvites from '../participants/EditAndListInvites';
import { v4 as uuidv4 } from 'uuid';


interface EventInvitation {
    id: string;
    eventId: string;
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

interface Props {
    event: Event
}

const EditEventForm = (props: Props) => {

    const [eventName, setEventName] = useState<string>()
    const [eventDescription, setEventDescription] = useState<string>()
    const [startDate, setEventStartDate] = useState<string>()
    const [eventInvitations, setEventInvitations] = useState<EventInvitation[]>();


    useEffect(() => {
    }, [eventName, eventDescription, startDate]);


    useEffect(() => {
        setEventName(props.event.name);
        setEventDescription(props.event.description);
        setEventDescription(props.event.startDate);
    }, []);

    // Tid
    let prefilledStartTime = startDate?.substr(11, 5);
    // Datum
    let prefilledStartDate = startDate?.substr(0, 10);

    let addMoreInvites = (invitation: string) => {
        let newInvitation: EventInvitation = {
            id: uuidv4(),
            eventId: props.event.id,
            email: invitation,
            invitationStatus: 0
        }
        if (eventInvitations && newInvitation) {
            setEventInvitations([...eventInvitations, newInvitation]);
        } else {
            setEventInvitations([newInvitation]);
        }

    }
    if (props.event) {
        return (
            <div>
                <h2>Redigera event</h2>
                <form className="event-form" onSubmit={handleSubmit} id="event-form-data">
                    <input name="name" type="text" value={eventName} onChange={(e) => setEventName(e.target.value)} placeholder={eventName} />
                    <textarea form="event-form-data" name="description" value={eventDescription} onChange={(e) => setEventDescription(e.target.value)} placeholder={eventDescription} cols={30} rows={10}></textarea>
                    <input name="startDate" type="date" defaultValue={prefilledStartDate} />
                    <input name="startTime" type="time" defaultValue={prefilledStartTime} />
                    <EditAndListInvites addMoreInvites={addMoreInvites} eventInvitations={props.event.sentInvitations} />
                    <button type="submit">Spara redigerat event</button>
                </form>
            </div>
        )
    } else {
        return (
            <h1>Error in editEventform.</h1>
        )
    }
}

export default EditEventForm
