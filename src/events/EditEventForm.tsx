import React, { useState, useEffect, FormEvent } from 'react'
import './EventsPage.css';
import HttpClient from '../common/HttpClient';
import EventService from '../services/EventService';
import moment from 'moment';
import EditEventPage from './EditEventPage';
import { stringify } from 'querystring';
import EditAndListInvites from '../participants/EditAndListInvites';
import { v4 as uuidv4 } from 'uuid';

interface Props {
    eventName: string
    eventDescription: string,
    eventStartDateAndTime: string,
    updateEventObject(e: any): void,
    children: React.ReactNode

}

const EditEventForm = (props: Props) => {

    const [eventName, setEventName] = useState<string>()
    const [eventDescription, setEventDescription] = useState<string>()
    const [startDate, setEventStartDate] = useState<string>()
    const [startTime, setEventStartTime] = useState<string>()


    useEffect(() => {
        setEventName(props.eventName);
        setEventDescription(props.eventDescription);
        setEventStartDate(props.eventStartDateAndTime.substr(0, 10));
        setEventStartTime(props.eventStartDateAndTime.substr(11, 5));
    }, []);

    const passToParent = (event: any) => {
        event.preventDefault();
        var formObject = Object.fromEntries(new FormData(event.target));

        props.updateEventObject(formObject);

    }

    if (props) {
        return (
            <div>
                <h2>Redigera event</h2>
                <form className="event-form" onSubmit={passToParent} id="event-form-data">
                    <input name="name" type="text" value={eventName} onChange={(e) => setEventName(e.target.value)} placeholder={eventName} />
                    <textarea form="event-form-data" name="description" value={eventDescription} onChange={(e) => setEventDescription(e.target.value)} placeholder={eventDescription} cols={30} rows={10}></textarea>
                    <input name="startDate" id="startDate" type="date" defaultValue={startDate} />
                    <input name="startTime" id="startTime" type="time" defaultValue={startTime} />
                    {props.children}
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
