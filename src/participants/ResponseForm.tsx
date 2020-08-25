import React from "react";

const ResponseForm = (props: any) => {

    const passToParent = (event: any) => {
        event.preventDefault();
        var formObject = Object.fromEntries(new FormData(event.target));
        if (formObject.rsvp == "decline") {
            props.updateInvitationStatus(1);
        }
        else if (formObject.rsvp == "accept") {
            props.updateInvitationStatus(2);
        } else {
            throw new Error("Problem with RSVP-buttons.");
        }


    }
    return (
        <div>
            <form onSubmit={passToParent} id="event-form-data">
                <label htmlFor="accept">Accept</label>
                <input type="radio" name="rsvp" value="accept" />
                <label htmlFor="decline">Decline</label>
                <input type="radio" name="rsvp" value="decline" />
                <input type="submit" value="Svara" />
            </form>
        </div>
    )
}

export default ResponseForm;