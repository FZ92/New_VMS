import http from "../http-common";

class DataService {
    getAll() {
        return http.get("/Veranstaltung");
    }

    get(id) {
        return http.get(`/Veranstaltung/${id}`);
    }

    create(data) {
        return http.post("/Veranstaltung", data);
    }

    update(id, data) {
        return http.put(`/Veranstaltung/${id}`, data);
    }

    delete(id) {
        return http.delete(`/Veranstaltung/${id}`);
    }

    deleteAll() {
        return http.delete(`/Veranstaltung`);
    }

    findByTitle(title) {
        return http.get(`/Veranstaltung?title=${title}`);
    }
}

export default new DataService();