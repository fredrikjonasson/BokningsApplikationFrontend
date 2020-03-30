import HttpClient from '../common/HttpClient';

export default class EventService {
    client: HttpClient;

    constructor(client: HttpClient) {
        this.client = client;
    }

    AddEvent(event: any) {
        return this.client.post("/events", event);
    }
}