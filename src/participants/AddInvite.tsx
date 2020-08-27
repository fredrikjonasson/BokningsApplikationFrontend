import React, { useState, useEffect } from 'react'
import ParticipantService from '../services/ParticipantService'


interface Props {
    handleInvite(invitations: string[]): void;
    invitations: string[]
}

const AddInvite = (props: Props) => {

    const [email, setEmail] = useState<string>("")
    const [invitations, setInvitations] = useState<string[]>([])

    const updateInvites = () => {
        setInvitations([...invitations, email]);
        setEmail("");
    }

    const removeInvite = (e: any) => {
        setInvitations(invitations => invitations.filter(element => element != e));
    }

    useEffect(() => {
        props.handleInvite(invitations);
    }, [invitations]);

    return (
        <div>
            <h2>Lägg till deltagare</h2>
            <label htmlFor="Participant">Skriv in e-postadressen till den du vill bjuda in och tryck lägg till</label>
            <input name="Invite" type="text" placeholder="Invite" value={email} onChange={(e) => setEmail(e.target.value)} />
            <button type="button" onClick={updateInvites}>Lägg till i inbjudningar</button>
            {props.invitations.map(invite => {
                return (<div>
                    <p>{invite} <button type="button" id="removeInvitation" onClick={() => { removeInvite(invite) }}>Remove</button></p>
                </div>)
            })}
        </div>
    )

}
export default AddInvite