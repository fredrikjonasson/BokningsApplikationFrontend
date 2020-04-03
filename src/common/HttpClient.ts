export default class HttpClient {
    async get(url: string) {
        return fetch(url, {
            method: "GET",
        })
    }
    async post(url: string, body: any) {
        return fetch("https://localhost:44306/events/", {
            method: "POST",
            body: body
            // headers: {
            //     Authorization: "Bearer ljdsöfkjasldöjfölasjfdöljsadölfjalskdf"
            // }
        });
    }
}