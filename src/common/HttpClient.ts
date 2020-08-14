export default class HttpClient {
    async get(url: string, id?: string) {
        if (id) {
            console.log(this.baseUrl + id);
            return fetch(`${this.baseUrl + id}`, {
                method: "GET",
            })
        } else {
            return fetch(`${this.baseUrl + url}`, {
                method: "GET",
            })

        }
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

    async put(url: string, id: string, body: any) {
        return fetch(`${this.baseUrl + url + "/" + id}`, {
            method: "PUT",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json"
            }
        });
    }
}