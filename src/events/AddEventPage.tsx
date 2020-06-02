import React, { useState } from 'react'
import './EventsPage.css';
import HttpClient from '../common/HttpClient';
import EventService from '../services/EventService';
import moment from 'moment';
import AddInvite from '../participants/AddInvite';

const eventService = new EventService(new HttpClient("https://localhost:44306"))

const AddEventPage = () => {
    const [invitations, setInvitations] = useState<string[]>([]);
    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");

    const handleSubmit = (event: any) => {
        event.preventDefault();
        var formObject = Object.fromEntries(new FormData(event.target));

        var dto = {
            Name: name,
            Description: description,
            StartDate: moment.utc(`${formObject.startDate} ${formObject.startTime}`),
            SentInvitations: invitations
        }
        eventService.AddEvent(dto);
    }

    const handleInvite = (invitations: string[]) => {
        setInvitations(invitations);
    }

    return (
        <div>
            <h2>Lägg till event</h2>
            <form className="event-form" onSubmit={handleSubmit} id="event-form-data">
                <input name="name" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Namn" />
                <textarea form="event-form-data" name="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Beskrivning" cols={30} rows={10}></textarea>
                <input name="startDate" type="date" />
                <input name="startTime" type="time" />
                <AddInvite handleInvite={handleInvite} />
                <button type="submit">Spara event</button>
            </form>
        </div>
    )
}

export default AddEventPage
