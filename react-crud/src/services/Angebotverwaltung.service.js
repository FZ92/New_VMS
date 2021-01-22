import http from "../http-common";

class DataService {
    getAll() {
        return http.get("/Angebot");
    }

    get(AngebotID) {
        return http.get(`/Angebot/${AngebotID}`);
    }

    create(data) {
        return http.post("/Angebot", data);
    }

    update(AngebotID, data) {
        return http.put(`/Angebot/${AngebotID}`, data);
    }

    delete(AngebotID) {
        return http.delete(`/Angebot/${AngebotID}`);
    }

}

export default new DataService();