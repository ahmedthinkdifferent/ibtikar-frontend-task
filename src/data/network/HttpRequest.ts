export default class HttpRequest {
    method: ("POST" | "GET" | "PUT" | "DELETE") = "GET";
    queryParams: {} = {};
    body: {} = {};
    headers: {} = {};
    url: string = "";
    baseUrl?: string;
}