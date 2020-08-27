import React, { useState, useEffect, FormEvent } from 'react';
import HttpClient from '../common/HttpClient';
import EditEventForm from '../events/EditEventForm';
import EventService from '../services/EventService';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import EditAndListInvites from '../participants/EditAndListInvites';
import { exception } from 'console';


const eventService = new EventService(new HttpClient("https://localhost:44306"));
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
const EditEventPage = () => {
    const [eventObject, setEventObject] = useState<Event>()

    useEffect(() => {
        async function fetchEvent(eventId: string) {
            let answer: Event = await eventService.FetchEvent(eventId).then(
                function (data: any) {
                    return data.json();
                }
            ).catch(error => console.log(error));
            return setEventObject(answer);
        }
        var eventId = window.location.search;
        eventId = eventId.substr(1);
        fetchEvent(eventId);
    }, []);

    const addInvitation = (newEventInvitation: EventInvitation) => {
        if (eventObject) {
            setEventObject(eventObject => {
                if (eventObject) {
                    eventObject.sentInvitations.push(newEventInvitation);
                } else {
                    throw new Error("something is wrong in editeventpage.tsx");

                }
                return eventObject;
            });
        } else {
            throw new Error("something is wrong in editeventpage.tsx");

        }
    }

    const buildInvitation = (email: string) => {
        let duplicate: boolean = false;
        if (eventObject) {
            for (const iterator of eventObject.sentInvitations) {
                if (iterator.email == email) {
                    duplicate = true;
                    alert("You can't invite same person more than once.")
                }
            }
            if (!duplicate) {
                let newInvitation: EventInvitation = {
                    id: uuidv4(),
                    eventId: eventObject.id,
                    email: email,
                    invitationStatus: 0
                }
                addInvitation(newInvitation);
            }
        } else {
            throw new Error("something is wrong in editeventpage.tsx");

        }
    }

    const updateEventObject = (formObject: any) => {
        if (eventObject) {
            setEventObject((eventObject) => {
                if (eventObject) {
                    eventObject.name = formObject.name;
                    eventObject.description = formObject.description;
                    eventObject.startDate = moment.utc(`${formObject.startDate} ${formObject.startTime}`).toString();
                    return eventObject
                }
            });
            const eventService = new EventService(new HttpClient("https://localhost:44306"));
            eventService.EditEvent(eventObject, eventObject.id);
        } else {
            throw new Error("something is wrong in editeventpage.tsx");

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
                <EditEventForm updateEventObject={updateEventObject} eventName={eventObject.name} eventDescription={eventObject.description} eventStartDateAndTime={eventObject.startDate}>
                    <EditAndListInvites buildInvitation={buildInvitation} eventInvitations={eventObject.sentInvitations} />
                </EditEventForm>
            </div>
        );

    }
}

export default EditEventPage