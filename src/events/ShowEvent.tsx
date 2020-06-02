import React, { useState } from 'react'
import HttpClient from '../common/HttpClient';
import EventService from '../services/EventService';

const eventService = new EventService(new HttpClient("https://localhost:44306"))

const ShowEventPage = () => {
    let [events, setEvents] = useState<Array<any>>([]);

    const ShowEvents = async () => {
        setEvents(await (await eventService.ShowEvents()).json());
    }
    

return (

    <div>
        
        {events.map(element => <p>{element.name}</p>)}

    </div>
)

}
export default ShowEventPage