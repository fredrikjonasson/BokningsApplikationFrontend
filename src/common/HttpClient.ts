export default class HttpClient {
    async get(url: string) {
        return fetch(url, {
            method: "GET",
        })
    }

    baseUrl: string | undefined;

    constructor(url: string | undefined) {
        this.baseUrl = url;
    }

    async post(url: string, body: any) {
        return fetch(`${this.baseUrl + url}`, {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json"
                // Authorization: "Bearer ljdsöfkjasldöjfölasjfdöljsadölfjalskdf"
            }
        });
    }

}