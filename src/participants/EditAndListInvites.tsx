import React, { useState, useEffect } from 'react'
import ParticipantService from '../services/ParticipantService'

interface EventInvitation {
    id: string;
    eventId: string;
    email: string;
    invitationStatus: number;
}

interface Props {
    eventInvitations: EventInvitation[]
    buildInvitation(email: string): void

}


const EditAndListInvites = (props: Props) => {

    const [email, setEmail] = useState<string>("")
    const [eventInvitations, setEventInvitations] = useState<EventInvitation[]>();


    useEffect(() => {
        if (props.eventInvitations) {
            setEventInvitations(props.eventInvitations);
        }
    }, [props]);

    const sendInvitation = () => {
        props.buildInvitation(email);
        setEmail("");
    }

    return (
        <div>
            <h2>Lägg till deltagare</h2>
            <label htmlFor="Participant">Skriv in e-postadressen till den du vill bjuda in och tryck lägg till</label>
            <input name="Invite" type="text" placeholder="Invite" value={email} onChange={(e) => setEmail(e.target.value)} />
            <button type="button" onClick={sendInvitation}>Lägg till i inbjudningar</button>
            {eventInvitations?.map(invite => <p>{invite.email}</p>)}
        </div>
    )
}
export default EditAndListInvites