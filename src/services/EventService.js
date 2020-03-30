export default class EventService {
    contructor(client, baseUrl){
        this.client = client;
        this.baseUrl = baseUrl;
    }

    AddEvent(event){
        return this.client.post(`${baseUrl}`, event);
    }
}