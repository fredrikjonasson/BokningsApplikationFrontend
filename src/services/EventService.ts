import HttpClient from '../common/HttpClient';

export default class EventService {
    client: HttpClient;

    constructor(client: HttpClient) {
        this.client = client;
    }

    FetchEvent(id: string) {
        return this.client.get("/event", id);
    }
    AddEvent(event: any) {
        return this.client.post("/events", event);
    }

    EditEvent(event: any, id: string) {
        console.log(id);
        return this.client.put("/event", id, event)
    }

    ShowEvents() {
        return this.client.get("/events");
    }
}