import React, { useState } from 'react'
import './EventsPage.css';
import HttpClient from '../common/HttpClient';
import EventService from '../services/EventService';

const eventService = new EventService(new HttpClient())

const EventPage = () => {
    const handleSubmit = (event: any) => {
        event.preventDefault();
        eventService.AddEvent(event.target);
    }

    let addEvent = (e: any) => {
        alert('hej')
    }

    return (
        <div>
            <h2>Lägg till event</h2>
            <form className="event-form" onSubmit={handleSubmit} id="event-form-data">
                <input name="name" type="text" placeholder="Namn" />
                <textarea form="event-form-data" name="description" placeholder="Beskrivning" cols={30} rows={10}></textarea>
                <input name="startDate" type="date" />
                <input name="startTime" type="time" />
                <button type="submit">Spara event</button>
            </form>
        </div>
    )
}

export default EventPage
