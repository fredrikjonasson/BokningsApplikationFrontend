import React, { useEffect } from 'react';
import EventService from '../services/EventService';
import HttpClient from '../common/HttpClient';
import ResponseForm from '../participants/ResponseForm';

const RespondToInvitation = () => {
    let eventService = new EventService(new HttpClient("https://run.mocky.io/v3"))
    const validateInvitation = () => {
        const invitationID: string = fetchInvitationFromUrl();
        mockFetch();

    }
    //
    const mockFetch = async () => {
        let answer = await eventService.FetchInvitation("f3a6fc74-b05c-4450-8334-c8751ae71dae").then(value => { return value.json(); }).catch(error => console.log(error));
        console.log(answer);
    }
    const fetchInvitationFromUrl = () => {
        let id: string = window.location.pathname;
        let regexp: RegExp = /(?!([\/invitations\/])).*/;
        let result: any = regexp.exec(id);
        let extractedId = result[0];
        console.log(extractedId);
        if (extractedId.charAt(extractedId.length - 1) == "/") {
            return extractedId.slice(0, extractedId.length - 1);
        } else {
            return extractedId;
        }
    }
    validateInvitation();
    return (
        <div>
            <h1> Invitation </h1>
            <ResponseForm />
        </div>
    )



}

export default RespondToInvitation;