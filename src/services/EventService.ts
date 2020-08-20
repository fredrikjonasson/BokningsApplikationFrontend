import HttpClient from '../common/HttpClient';

export default class EventService {
    client: HttpClient;

    constructor(client: HttpClient) {
        this.client = client;
    }

    FetchInvitation(id: string) {
        return this.client.get("", id)
    }

    FetchEvent(id: string) {
        return this.client.get("/events", id);
    }

    FetchParticipants(id: string) {
        id = id + "/participants"
        return this.client.get("/events", id);
    }

    AddEvent(event: any) {
        return this.client.post("/events", event);
    }

    EditEvent(event: any, id: string) {
        return this.client.put("/events", id, event)
    }

    ShowEvents() {
        return this.client.get("/events");
    }
}