import React, { useState, useEffect } from 'react'
import ParticipantService from '../services/ParticipantService'


interface EventInvitations {
    id: string;
    EventId: string;
    email: string;
    invitationStatus: number;
}
interface Event {
    sentInvitations: EventInvitations[];
    id: string;
    name: string;
    description: string;
    email: string;
    invitationStatus: number;
}

interface Props {
    handleInvite(invitations: EventInvitations[]): void;
    eventObject: Event;
}

interface PropsDto {
    propsDto: Props;
}

const EditAndListInvites = (props: PropsDto) => {

    const [eventObject, setEventObject] = useState<Event>();
    const [email, setEmail] = useState<string>("")

    const updateInvites = () => {

        if ((eventObject?.sentInvitations.includes(email))) {
            alert("You can't add the same email twice");
        } else {
            props.propsDto.handleInvite([...invitations, email]);
        }
        setEmail("");
    }

    useEffect(() => {
        setEventObject(props.propsDto.eventObject);
    }, [props.propsDto.eventObject]);

    return (
        <div>
            <h2>Lägg till deltagare</h2>
            <label htmlFor="Participant">Skriv in e-postadressen till den du vill bjuda in och tryck lägg till</label>
            <input name="Invite" type="text" placeholder="Invite" value={email} onChange={(e) => setEmail(e.target.value)} />
            <button type="button" onClick={updateInvites}>Lägg till i inbjudningar</button>
            {invitations.map(invite => <p>{invite}</p>)}
        </div>
    )

}
export default EditAndListInvites