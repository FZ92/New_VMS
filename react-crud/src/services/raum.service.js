import http from "../http-common";

class DataService {
    getAll() {
        return http.get("/Raum");
    }

    get(RaumID) {
        return http.get(`/Raum/${RaumID}`);
    }

    update(RaumID, data) {
        return http.put(`/Raum/${RaumID}`, data);
    }

}

export default new DataService();