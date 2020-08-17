import React, { useState, useEffect } from 'react'
import ParticipantService from '../services/ParticipantService'

interface EventInvitation {
    id: string;
    eventId: string;
    email: string;
    invitationStatus: number;
}

interface Props {
    addMoreInvites(invitation: string): void;
    eventInvitations: EventInvitation[]

}


const EditAndListInvites = (props: Props) => {

    const [email, setEmail] = useState<string>("")
    const [eventInvitations, setEventInvitations] = useState<EventInvitation[]>();

    const updateInvites = () => {
        if (eventInvitations) {
            let scanArray = [];
            for (const iterator of eventInvitations) {
                scanArray.push(iterator.email);
            }
            if (scanArray.includes(email)) {
                alert("You can't add the same email twice");
            } else {
                props.addMoreInvites(email);
            }
            if (eventInvitations) {
                copyEventObject.sentInvitations.push(newInvitation);
                setEventObject(copyEventObject);
            }
        }
        setEmail("");
    }



    useEffect(() => {
        console.log("Test state")
        if (props.eventInvitations) {
            setEventInvitations(props.eventInvitations);
        }
    }, []);

    return (
        <div>
            <h2>Lägg till deltagare</h2>
            <label htmlFor="Participant">Skriv in e-postadressen till den du vill bjuda in och tryck lägg till</label>
            <input name="Invite" type="text" placeholder="Invite" value={email} onChange={(e) => setEmail(e.target.value)} />
            <button type="button" onClick={updateInvites}>Lägg till i inbjudningar</button>
            {eventInvitations?.map(invite => <p>{invite.email}</p>)}
        </div>
    )
}
export default EditAndListInvites