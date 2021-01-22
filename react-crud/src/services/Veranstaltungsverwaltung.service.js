import http from "../http-common";

class DataService {
    getAll() {
        return http.get("/Veranstaltung");
    }

    get(VeranstaltungID) {
        return http.get(`/Veranstaltung/${VeranstaltungID}`);
    }

    create(data) {
        return http.post("/Veranstaltung", data);
    }

    update(VeranstaltungID, data) {
        return http.put(`/Veranstaltung/${VeranstaltungID}`, data);
    }

    delete(VeranstaltungID) {
        return http.delete(`/Veranstaltung/${VeranstaltungID}`);
    }

}

export default new DataService();