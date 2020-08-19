import React, { useState, useEffect } from "react";
import EventService from '../services/EventService';
import HttpClient from "../common/HttpClient";

interface ContactInformation {
    email: string,
    firstName: string,
    id: string,
    lastname: string
}
interface Participant {
    id: string
    contactInformation: ContactInformation
}

const ListParticipantsPage = () => {
    const eventService = new EventService(new HttpClient("https://localhost:44306"));
    const [Participants, setParticipants] = useState<Participant[]>();

    useEffect(() => {
        async function fetchparticipants(eventId: string) {
            let answer = await eventService.FetchParticipants(eventId).then(
                function (data: any) {
                    return data.json();
                }
            ).catch(error => console.log(error));
            setParticipants(answer);
        }
        fetchparticipants("55");
    }, []);

    if (Participants) {
        return (
            <div>
                {Participants?.map(invite => <p>{invite.contactInformation.firstName}</p>)}
            </div>
        );
    } else {
        return (
            <div>
                <h1>Oklarheter</h1>
            </div>
        );
    }
}
export default ListParticipantsPage;