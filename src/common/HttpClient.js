export default class HttpClient {
    async get(url){
        return fetch(url, {
            method: "GET",
        })
    }
    async post(url, body){
        return fetch("http://apiurl.com/api/???", {
            method: "POST",
            body: body,
            header: {
                Authorization: "Bearer ljdsöfkjasldöjfölasjfdöljsadölfjalskdf"
            }
        });
    }
}