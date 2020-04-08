import React, { useState } from 'react'
import './EventsPage.css';
import HttpClient from '../common/HttpClient';
import EventService from '../services/EventService';
import moment from 'moment';

const eventService = new EventService(new HttpClient())

const EventPage = () => {
    const [event, setEvent] = useState({
        name: "",
        description: "",
        startDate: "",
        startTime: ""
    });

    const handleSubmit = (event: any) => {
        event.preventDefault();
        var formObject = Object.fromEntries(new FormData(event.target));

        var dto = {
            ...formObject,
            startDate: moment.utc(`${formObject.startDate} ${formObject.startTime}`)
        }
        eventService.AddEvent(dto);
    }

    return (
        <div>
            <h2>Lägg till event</h2>
            <form className="event-form" onSubmit={handleSubmit} id="event-form-data">
                <input value={event.name} onChange={} name="name" type="text" placeholder="Namn" />
                <textarea form="event-form-data" name="description" placeholder="Beskrivning" cols={30} rows={10}></textarea>
                <input name="startDate" type="date" />
                <input name="startTime" type="time" />
                <button type="submit">Spara event</button>
            </form>
        </div>
    )
}

export default EventPage
