import axios from "axios";
import UserCache from "../cache/UserCache";
import HttpRequest from "./HttpRequest";
import AppConfigManager from "../config/AppConfigManager";

// Add a request interceptor
axios.interceptors.request.use(
    function (config) {
        config.headers['Accept-Language'] = "en";
        const loginUser = UserCache.getUser();
        if (loginUser && loginUser.token) {
            config.headers["Authorization"] = loginUser.token;
        }
        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    }
);

// Add a response interceptor
axios.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        const exceptionToThrow: any = {};
        if (error.response) {
            // error has response.
            exceptionToThrow.message = error.response.data.message;
            exceptionToThrow.serverCode = error.response.status;
            exceptionToThrow.statusCode = error.response.data.statusCode;
        } else {
            // error not has response , error in server or timeout.
            exceptionToThrow.message = "خطأ فى الاتصال,حاول مرة أخرى.";
            exceptionToThrow.serverCode = 500;
            exceptionToThrow.statusCode = "NETWORK_ERROR";
        }

        return Promise.reject(exceptionToThrow);
    }
);

export default class HttpService {
    /**
     * @param {HttpRequest} request
     */
    static send(request: HttpRequest) {
        const url = HttpService.getConnectionUrl(request);
        switch (request.method) {
            case "POST" :
                return axios.post(url, request.body, {
                    headers: request.headers,
                    params: request.queryParams,
                });
            case "GET" :
                return axios.get(url, {
                    headers: request.headers,
                    params: request.queryParams,
                });
            case "PUT" :
                return axios.put(url, request.body, {
                    headers: request.headers,
                    params: request.queryParams,
                });
            case "DELETE":
                return axios.delete(url, {
                    headers: request.headers,
                    params: request.queryParams,
                });
            default:
                throw new Error("request method must be added before send request.");
        }
    }

    /**
     * @param {HttpRequest} request
     */
    static getConnectionUrl(request: HttpRequest) {
        const isRequestHasBaseUrl = (request.baseUrl != null && request.baseUrl !== "");
        const appConfig = AppConfigManager.getInstance().getAppConfig();
        const baseUrl = isRequestHasBaseUrl ? request.baseUrl : appConfig.default.backendUrl;
        let apiUrl = request.url;
        if (!apiUrl.startsWith("/")) {
            apiUrl = "/" + apiUrl;
        }
        return baseUrl + apiUrl;
    }
}