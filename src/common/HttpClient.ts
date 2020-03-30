export default class HttpClient {
    async get(url: string) {
        return fetch(url, {
            method: "GET",
        })
    }
    async post(url: string, body: any) {
        return fetch("http://apiurl.com/api/???", {
            method: "POST",
            body: body,
            headers: {
                Authorization: "Bearer ljdsöfkjasldöjfölasjfdöljsadölfjalskdf"
            }
        });
    }
}