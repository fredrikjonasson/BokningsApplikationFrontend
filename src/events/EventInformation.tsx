import React, { useEffect, useState } from 'react';

interface InvitationInformation {
    name: string,
    description: string,
    startDate: string
}
interface Props {
    InvitationInformation: InvitationInformation
}

const EventInformation = (props?: Props) => {
    const [InvitationInformation, setInvitationInformation] = useState<InvitationInformation>();

    if (props) {
        let startDate = (props.InvitationInformation.startDate.substr(0, 10));
        let startTime = (props.InvitationInformation.startDate.substr(11, 5));
        return (
            <div>
                <h1>Eventnamn: {props.InvitationInformation.name}</h1>
                <h1>Eventbeskrivning: {props.InvitationInformation.description}</h1>
                <h1>Datum: {startDate}</h1>
                <h1>Tid: {startTime}</h1>
            </div>
        )
    } else {
        return (
            <div>
                <h1>There is something wrong with the eventlink.</h1>
            </div>
        )

    }
}
export default EventInformation;