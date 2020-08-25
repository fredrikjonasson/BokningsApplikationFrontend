import React, { useEffect, useState } from 'react';
import EventInformation from '../events/EventInformation';
import ResponseForm from './ResponseForm';
import EventService from '../services/EventService';
import HttpClient from '../common/HttpClient';

interface InvitationInformation {
    name: string,
    description: string,
    startDate: string
    sentInvitations: any
}

const ViewAndRespondToInvitation = () => {
    const [InvitationInformation, setInvitationInformation] = useState<InvitationInformation>();

    let eventService = new EventService(new HttpClient("https://run.mocky.io/v3"));

    useEffect(() => {
        const mockFetch = async () => {
            let answer = await eventService.FetchInvitation("f3a6fc74-b05c-4450-8334-c8751ae71dae").then(value => { return value.json(); }).catch(error => console.log(error));
            console.log(answer);
            console.log(answer.sentInvitations[0].invitationStatus);
            return setInvitationInformation(answer as InvitationInformation);
        }
        mockFetch();

    }, []);

    const updateInvitationStatus = (invitationResponse: number) => {
        console.log(invitationResponse);
    }

    if (InvitationInformation) {
        if (InvitationInformation.sentInvitations[0].invitationStatus == 0) {
            return (
                <div>
                    <EventInformation InvitationInformation={InvitationInformation} />
                    <ResponseForm updateInvitationStatus={updateInvitationStatus} />
                </div>
            )
        } else {
            return (
                <div>
                    <EventInformation InvitationInformation={InvitationInformation} />
                    <h1>Note that you have already RSVP:d</h1>
                </div>
            )
        }

    } else {
        return (
            <div>
                <h1>Error</h1>
            </div>
        )

    }
}

export default ViewAndRespondToInvitation;    