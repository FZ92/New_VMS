import http from "../http-common";

class DataService {
    /*getAll() {
        return http.get("/Anfrage");
    }*/

    getAllAndUser() {
        return http.get("/Anfrage");
    }

    get(AnfrageID) {
        return http.get(`/Anfrage/${AnfrageID}`);
    }

    create(data) {
        return http.post("/Anfrage", data);
    }

    update(AnfrageID, data) {
        return http.put(`/Anfrage/${AnfrageID}`, data);
    }

    delete(AnfrageID) {
        return http.delete(`/Anfrage/${AnfrageID}`);
    }

}

export default new DataService();