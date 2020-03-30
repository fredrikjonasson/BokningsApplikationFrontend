import React, {useState} from 'react'
import './EventsPage.css';
import HttpClient from '../common/HttpClient.js';
import EventService from '../services/EventService.js';

const eventService = new EventService(new HttpClient(), "https://api.com")

const EventPage = () => {
    const handleSubmit = (event) => {
        eventService.AddEvent(event.target);
    }
    
    let addEvent = (e) => {
        alert('hej')
    }

    return (
        <div>
            <h2>Lägg till event</h2>
            <form className="event-form" onSubmit={handleSubmit} id="event-form-data">
                <input name="name" type="text" placeholder="Namn"/>         
                <textarea form="event-form-data" name="description" placeholder="Beskrivning" cols="30" rows="10"></textarea>    
                <input name="startDate" type="Date" />    
                <input name="startTime" type="Time" />
                <button type="Submit">Spara event</button>
            </form>
        </div>
    )
}

export default EventPage
