import React, { useState, useEffect } from 'react'
import './EventsPage.css';
import HttpClient from '../common/HttpClient';
import EventService from '../services/EventService';
import moment from 'moment';
import AddInvite from '../participants/AddInvite';
import EditEventPage from './EditEventPage';
import { stringify } from 'querystring';

const eventService = new EventService(new HttpClient("https://localhost:44306"))

const EditEventForm = (props: any) => {

    console.log(props.event.sentInvitations);
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

    interface InvitationObject {
        email: string;
        invitationStatus: number
    }

    useEffect(() => {
        const loadInvites = (invitationDTO: InvitationObject[]) => {
            let loadedInvitations = [];
            for (let invitation of invitationDTO) {
                loadedInvitations.push(invitation.email);
            }
            setInvitations(loadedInvitations);
        };
        loadInvites(props.event.sentInvitations);

    }, []);

    // Tid
    let prefilledStartTime = props.event.startDate.substr(11, 5);
    // Datum
    let prefilledStartDate = props.event.startDate.substr(0, 10);

    return (
        <div>
            <h2>Redigera event</h2>
            <form className="event-form" onSubmit={handleSubmit} id="event-form-data">
                <input name="name" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder={props.event.name} />
                <textarea form="event-form-data" name="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder={props.event.description} cols={30} rows={10}></textarea>
                <input name="startDate" type="date" defaultValue={prefilledStartDate} />
                <input name="startTime" type="time" defaultValue={prefilledStartTime} />
                <AddInvite handleInvite={handleInvite} />
                <button type="submit">Spara redigerat event</button>
            </form>
        </div>
    )
}

export default EditEventForm
